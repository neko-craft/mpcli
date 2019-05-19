#!/usr/bin/env node
const ArgumentParser = require('argparse').ArgumentParser;
const argparse = require('argparse');
const assets = require('./assets');
const xml2json = require('xml2js');
const readline = require('readline-sync');
const axios = require('axios');
const fs = require('fs');

const paperspigot_maven_metadata_url = "https://papermc.io/repo/repository/maven-public/com/destroystokyo/paper/paper-api/maven-metadata.xml";

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Minecraft Plugin Skeleton Builder'
});
const args = parser.parseArgs();
const deleteall = (path) => {
	var files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) {
				deleteall(curPath);
			} else {
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};
const core = () => {
    const project_name = readline.question('project name: ')
    if (fs.existsSync(project_name)) {
        const bool = readline.question(`Project [${project_name}] Exists, Override it ? (Y/N) : `)
        let answer = bool.toUpperCase().toString();
        if (answer === 'Y' || answer === '') {
            deleteall(project_name);
        } else {
            process.exit();
        }
    }
    const package_name = readline.question('package name: ');
    const main = readline.question('main method: (main): ');
    var main_method = '';
    if (main.length == 0) {
        main_method = 'main'
    } else {
        main_method = main;
    }
    try {
        const src_folder = package_name.replaceAll('.','/');
        const source_folder_full_path = `${project_name}/src/${src_folder}`;
        fs.mkdirSync(`${source_folder_full_path}`, {
            recursive: true
        });
        axios.get(paperspigot_maven_metadata_url).then((res) => {
            xml2json.parseString(res.data, (error, result) => {
                var select_version;
                const version = result.metadata.versioning[0];
                const latest_version = version['latest'][0];
                console.log("Version List: ");
                const version_list = version['versions'][0]['version'];
                version_list.forEach((ver, index) => {
                    console.log(`${index+1} - ${ver}`);
                })
                while (true) {
                    select_version = readline.question(`select PaperSpigot API version: [${latest_version}]: `);
                    if (select_version == '') {
                        select_version = latest_version;
                        break;
                    }
                    if (version_list[select_version -1] == undefined) {
                        console.log('incorrect version number, please select again');       
                        continue;
                    }
                    select_version = version_list[select_version -1];
                    break;
                }
                fs.appendFileSync(`${project_name}/pom.xml`, assets.pom_xml_file.
                replaceAll(`{{package_name}}`,package_name).
                replaceAll(`{{project_name}}`, project_name).
                replaceAll(`{{paperspigot_version}}`, select_version));
                console.log(`SUCCESS`);
            })
        }).catch((err) => {
            console.log(err)
            process.exit();
        })

        fs.appendFileSync(`${project_name}/src/config.yml`, '')
        fs.appendFileSync(`${project_name}/src/plugin.yml`, assets.plugin_yml_code.
        replaceAll(`{{project_name}}`,project_name).
        replaceAll(`{{main_method}}`, `${package_name}.${main_method}`));

        fs.appendFileSync(`${source_folder_full_path}/${main_method}.java`, assets.main_method_code.
        replaceAll(`{{package_name}}`, package_name).
        replaceAll(`{{main_method_name}}`,main_method));
    } catch (error) {
        console.log(error);
    }
}
core();
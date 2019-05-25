module.exports = {
    git_ignore: `# Compiled class file
    *.class
    
    # Log file
    *.log
    
    # BlueJ files
    *.ctxt
    
    # Mobile Tools for Java (J2ME)
    .mtj.tmp/
    
    # Package Files #
    *.jar
    *.war
    *.nar
    *.ear
    *.zip
    *.tar.gz
    *.rar
    
    # virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
    hs_err_pid*`,
    plugin_yml_code: `name: {{project_name}}
main: {{main_method}}
version: 1.00`,

    main_method_code: `package {{package_name}};
import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

public class {{main_method_name}} extends JavaPlugin {
	@Override
	public void onEnable() {

	}

	@Override
	public void onDisable() {

	}
}
`, 
    pom_xml_file: `<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0http://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion>
<groupId>{{package_name}}</groupId>
<artifactId>{{project_name}}</artifactId>
<version>1.0.0-SNAPSHOT</version>
<packaging>jar</packaging>
<properties>
    <file.encoding>UTF-8</file.encoding>
</properties>
<repositories>
    <repository>
        <id>papermc</id>
        <url>https://papermc.io/repo/repository/maven-public/</url>
    </repository>
</repositories>
<dependencies>
    <dependency>
        <groupId>com.destroystokyo.paper</groupId>
        <artifactId>paper-api</artifactId>
        <version>{{paperspigot_version}}</version>
    </dependency>
</dependencies>
<build>
    <defaultGoal>install</defaultGoal>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.1</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
                <encoding>utf-8</encoding>
            </configuration>
        </plugin>
    </plugins>
</build>
</project>`
}
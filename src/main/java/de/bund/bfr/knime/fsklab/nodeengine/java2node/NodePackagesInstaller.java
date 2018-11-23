package de.bund.bfr.knime.fsklab.nodeengine.java2node;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

import com.eclipsesource.v8.JavaCallback;
import com.eclipsesource.v8.NodeJS;
import com.eclipsesource.v8.V8Array;
import com.eclipsesource.v8.V8Object;

public class NodePackagesInstaller {
	
	static Properties props = new Properties();
	public static void main(String[] args) throws IOException {
		System.out.println("For the first run, the application will try to get the packages used to build the final library\n"
				+ "This may takes a while");
		File configFile = new File("./config.properties");
		FileReader reader = new FileReader(configFile);
		String finaleOutput = "";
		props.load(reader);
		finaleOutput = props.getProperty("finaleOutput");
		final NodeJS nodeJS = NodeJS.createNodeJS();
		JavaCallback callback = new JavaCallback() {

			public Object invoke(V8Object receiver, V8Array parameters) {
				return "Hello, JavaWorld!";
			}
		};
		nodeJS.getRuntime().registerJavaMethod(callback, "someJavaMethod");
		File packagesScript = new File(finaleOutput+"packages.js");
		

		nodeJS.exec(packagesScript);
		while (nodeJS.isRunning()) {
			nodeJS.handleMessage();
		}
		
		System.out.println("done");
		
		nodeJS.release();
		App.main(args);
	}

}

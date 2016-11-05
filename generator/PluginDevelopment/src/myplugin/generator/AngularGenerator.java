package myplugin.generator;

import freemarker.template.TemplateException;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.swing.JOptionPane;

import myplugin.generator.fmmodel.FMClass;
import myplugin.generator.fmmodel.FMModel;
import myplugin.generator.options.GeneratorOptions;
import myplugin.generator.options.ProjectOptions;

/** EJB generator that now generates incomplete ejb classes based on MagicDraw 
 * class model 
 * @ToDo: enhance resources/templates/ejbclass.ftl template and intermediate data structure
 *  (@see myplugin.generator.fmmodel) in order to generate complete ejb classes 
 */

public class AngularGenerator extends BasicGenerator {	
	
	public AngularGenerator(GeneratorOptions generatorOptions) {			
		super(generatorOptions);			
	}
	
	
	public Writer getWriter(String fileNamePart, String packageName) throws IOException {
		if (packageName != filePackage) {
			packageName.replace(".", File.separator);		
			filePackage = packageName;
		}
		
		String generatedFileName = "";

		String fileNamePartFirstLower = Character.toLowerCase(fileNamePart.charAt(0)) + fileNamePart.substring(1);
		
	    if(templateName.startsWith("entitylist")) {
			generatedFileName = fileNamePartFirstLower + "-list";
		}
		else if(templateName.startsWith("viewentity")) {
			generatedFileName = fileNamePartFirstLower;
		}
		else if(templateName.startsWith("addeditentity")) {
			generatedFileName = fileNamePartFirstLower + "-add-edit";
		}
		else if(templateName.startsWith("angularmodul")) {
			generatedFileName = fileNamePartFirstLower + ".module";
		}
		else if(templateName.startsWith("angularservices")) {
			generatedFileName = fileNamePartFirstLower + ".service";
		}
		else if(templateName.startsWith("angularcontrollers")) {
			generatedFileName = fileNamePartFirstLower + ".controller";
		}
		else if(templateName.startsWith("angularroutes")) {
			generatedFileName = fileNamePartFirstLower + ".route";
		}
		else if(templateName.startsWith("index")) {
			generatedFileName = fileNamePartFirstLower;
		}
		else if(templateName.startsWith("angularappmodule")) {
			generatedFileName = "app.module";
		}
	    
		
		String fullPath = outputPath
				+ File.separator
				+ (filePackage.isEmpty() ? "" : packageToPath(filePackage)
						+ File.separator)
				+ outputFileName.replace("{0}", generatedFileName);

		File of = new File(fullPath);
		if (!of.getParentFile().exists())
			if (!of.getParentFile().mkdirs()) {
				throw new IOException("An error occurred during output folder creation "
						+ outputPath);
			}

		System.out.println(of.getPath());
		System.out.println(of.getName());

		if (!isOverwrite() && of.exists())
			return null;

		return new OutputStreamWriter(new FileOutputStream(of));

	}
	

	public void generate() {
		
		try {
			super.generate();
		} catch (IOException e) {		
			JOptionPane.showMessageDialog(null, e.getMessage());
		}

		List<FMClass> classes = FMModel.getInstance().getClasses();
	//	List<FMRepositoryClass> repositoryClasses = FMModel.getInstance().getRepositoryClasses();
		for (int i = 0; i < classes.size(); i++) {
			FMClass cl = classes.get(i);			
			Writer out;
			File file = new File("client//app//components//" + cl.getName().toLowerCase());
	        if (!file.exists()) {
	            if (file.mkdir()) {
	                System.out.println("Directory is created!");
	            } else {
	                System.out.println("Failed to create directory!");
	            }
	        }
			Map<String, Object> context = new HashMap<String, Object>();
			try {
				out = getWriter(cl.getName(), "client//app//components//" + cl.getName().toLowerCase());
				if (out != null) {
					context.clear();
					context.put("class", cl);
					context.put("properties", cl.getProperties());					
					context.put("importedPackages", cl.getImportedPackages());		
	//				context.put("repositoryClass", repositoryClasses.get(i));
					getTemplate().process(context, out);
					out.flush();
				}
			} catch (TemplateException e) {	
				JOptionPane.showMessageDialog(null, e.getMessage());
			}	
			catch (IOException e) {
				JOptionPane.showMessageDialog(null, e.getMessage());
			}	
		}			
	}
	
	public void generateIndexPage() {
		// Test skup
		try {
			super.generate();
		} catch (IOException e) {		
			JOptionPane.showMessageDialog(null, e.getMessage());
		}
		List<FMClass> classes = FMModel.getInstance().getClasses();
		
		Writer out;
		Map<String, Object> context = new HashMap<String, Object>();
		try {
			out = getWriter("index", getFilePackage());
			if (out != null) {
				context.clear();
				context.put("classes", classes);
				getTemplate().process(context, out);
				out.flush();
			}
		} catch (TemplateException e) {	
			JOptionPane.showMessageDialog(null, e.getMessage());
		}	
		catch (IOException e) {
			JOptionPane.showMessageDialog(null, e.getMessage());
		}	
			
	}
	
	public void generateJSFile() {
		// Test skup
		try {
			super.generate();
		} catch (IOException e) {		
			JOptionPane.showMessageDialog(null, e.getMessage());
		}
		List<FMClass> classes = FMModel.getInstance().getClasses();
		
		for (int i = 0; i < classes.size(); i++) {
			FMClass cl = classes.get(i);			
			Writer out;
			File file = new File("client//app//components//" + cl.getName().toLowerCase());
			if (!file.exists()) {
	            if (file.mkdir()) {
	                System.out.println("Directory is created!");
	            } else {
	                System.out.println("Failed to create directory!");
	            }
	        }
			Map<String, Object> context = new HashMap<String, Object>();
			try {
				out = getWriter(cl.getName(), "client//app//components//" + cl.getName().toLowerCase());
				if (out != null) {
					context.clear();
					context.put("class", cl);
					getTemplate().process(context, out);
					out.flush();
				}
			} catch (TemplateException e) {	
				JOptionPane.showMessageDialog(null, e.getMessage());
			}	
			catch (IOException e) {
				JOptionPane.showMessageDialog(null, e.getMessage());
			}	
		}
	}
	
	public void generateAppModuleJSFile() {

		try {
			super.generate();
		} catch (IOException e) {		
			JOptionPane.showMessageDialog(null, e.getMessage());
		}
		List<FMClass> classes = FMModel.getInstance().getClasses();
		Writer out;
		Map<String, Object> context = new HashMap<String, Object>();
		try {
			out = getWriter("app.module", getFilePackage());
			if (out != null) {
				context.clear();
				context.put("classes", classes);
				getTemplate().process(context, out);
				out.flush();
			}
		} catch (TemplateException e) {	
			JOptionPane.showMessageDialog(null, e.getMessage());
		}	
		catch (IOException e) {
			JOptionPane.showMessageDialog(null, e.getMessage());
		}	
	}

}



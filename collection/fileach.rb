# a function for recurse all the files in a directory
def yue(dir)
	 Dir::foreach(dir) do |file|
	 	if file.eql? "." or file.eql? ".."
         nil
	 	else
		  if File.directory? dir+"/"+file
	       yue(dir+"/"+file)
		  else
		   puts dir+"/"+file
		  end
		end
	end
end
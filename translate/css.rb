require "csspool"

file = File.read("img/style.css")
 # sac = CSSPool::SAC::Parser.new 
 # doc = sac.parse(file) 
 
 # doc.rule_sets.each do |rule| 
 
 # 	# puts rule.selectors
 # 	  puts rule.declarations[0]

 # 	# rule.properties.each do |property| 
 # 	# 	p property 
 # 	# end 
 # end 

 doc = CSSPool::CSS(file)
 doc.rule_sets.each do |rule|
   rule.declarations.to_a.each do |f|
   	f=f.to_s
   	if f.index("url")
   		puts f
   	end
   end
 end
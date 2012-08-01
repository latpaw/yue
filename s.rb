require 'nokogiri'
require 'open-uri'
     doc = Nokogiri::HTML(open("http://www.google.com.vn/#q=crusher&hl=vi&start=10"))
     vars = ""
     doc.css('li.g').each do |content|
        content.css('h3 a').each do |a|
         para = a.content
         vars << '<h5><a href="/" title="' + a.content + '">' + a.content + '</a></h5>'
         vars << "\n"
        end
        content.css('.st').each do |p|
         vars << '<p>'+ p.content + '</p><br />'
         vars << "\n"
        end
     end
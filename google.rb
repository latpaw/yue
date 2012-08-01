require 'nokogiri'
require 'open-uri'
require 'mechanize'

class Spider
  def main(page,keyword)
     @keyword = keyword
     a = Mechanize.new { |agent|
      agent.user_agent_alias = 'Mac Safari'
     }

    a.get("http://www.google.co.in/search?hl=en&newwindow=1&noj=1&q=#{keyword}&oq=crusher&start=#{page}") do |doc|

     vars = ""
     doc.search('li.g').each do |content|
        content.search('h3 a').each do |a|
         para = a.content
         vars << '<h5><a href="/" title="' + a.content + '">' + a.content + '</a></h5>'
         vars << "\n"
        end
        content.search('.st').each do |p|
         vars << '<p>'+ p.content + '</p><br />'
         vars << "\n"
        end
     end
      return vars
    end
    
  end

  def html(keyword)
     y = 1.upto(2).collect {|x| x*10}
     return y.collect {|x| main(x,keyword)}.join(" ")
  end

end


IO.foreach("keyword") do |line|
    line = line.chop
    newspider = Spider.new
    newhtml = newspider.html(line)
    fh = File.open(line,"w")
    fh.puts(newhtml)
    fh.close
end
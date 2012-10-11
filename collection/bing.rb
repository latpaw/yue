require 'nokogiri'
require 'open-uri'

class Spider
  def main(page,keyword)
     @keyword = keyword
     doc = Nokogiri::HTML(open("http://www.bing.com/search?q=#{@keyword}&qs=n&sc=0-0&sp=-1&sk=&first=#{page}&FORM=PERE1"))
     vars = ""
     doc.css('li.sa_wr').each do |content|
        content.css('h3 a').each do |a|
         para = a.content
         vars << '<h5><a href="/" title="' + a.content + '">' + a.content + '</a></h5>'
         vars << "\n"
        end
        content.css('p').each do |p|
         vars << '<p>'+ p.content + '</p><br />'
         vars << "\n"
        end
     end
     return vars
  end

  def html(keyword)
     y = 1.upto(3).collect {|x| x*10 + 1}
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
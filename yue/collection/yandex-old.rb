require 'nokogiri'
require 'open-uri'

class Spider
  def main(page,keyword)
     @keyword = keyword
     url = "http://www.yandex.com/yandsearch?text=#{keyword}&p=#{page}"
     url = URI.escape(url)
     doc = Nokogiri::HTML(open(url))
     vars = "<ul class='byul'>"
     doc.css('li.b-serp-item').each do |content|
        content.css('h2 a').each do |a|
         para = a.content
         vars << '<li class="byli" ><h5><a href="/" title="' + a.content + '">' + a.content + '</a></h5>'
         vars << "\n"
        end
        content.css('.b-serp-item__text').each do |p|
         vars << '<p>'+ p.content + '</p>'
         vars << "</li>\n<br />"
        end
     end
     vars << "</ul>"
     return vars
  end

  def html(keyword)
     y = 0.upto(2).collect {|x| x}
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
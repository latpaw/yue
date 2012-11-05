#yandex version with nokogiri and open-uri

require 'nokogiri'
require 'open-uri'

class Spider
  def main(page,keyword)
     @keyword = keyword
     url = "http://www.yandex.com/yandsearch?text=#{keyword}&p=#{page}"
     url = URI.escape(url)
     doc = Nokogiri::HTML(open(url))
     vars = Array.new
     i=0
     doc.css('.b-serp2-item').each do |content|
        temp= ""
        content.css('h2 a').each do |a|
         para = rand(800)
         temp << '<li class="byli" ><h5><a href="' + para.to_s + '.php" title="' + a.content + '">' + a.content + '</a></h5>'
         temp << "\n"
        end
        content.css('.b-serp2-item__text').each do |p|
         temp << '<p>'+ p.content + '</p>'
         temp << "</li>\n<br />"
        end
        vars[i]=temp
        i=i.succ
     end
     vars.shuffle!
     vars_content =""
     vars.each {|x| vars_content << x unless x.nil? }
     return vars_content
  end

  def html(keyword)
     y = 0.upto(2).collect {|x| x}
     return y.collect {|x| main(x,keyword)}.join(" ")
  end

end

################should be changed everytime
p=1
################
IO.foreach("keyword") do |line|
    line = line.chop
    newspider = Spider.new
    newhtml = newspider.html(line)
    newhtml.gsub!(/metso|sandvik|terex|shanbao|sbm|shibang|liming|zenith/i,"Zenith")
    newhtml.gsub!(/[\w]+@[\w]+.(com|net|org|cn)/,"")
    newhtml.gsub!(/[\d]{5,12}/,"")
    newhtml.gsub!(/'/,"")
    newhtml = "<?php $title='" + line + "'; $content='" + "<ul class=\"byul\">" + newhtml + "</ul>" +"'; include('head.php'); include('foot.php'); ?>"
    # line2 = line.split.join("-")
    fh = File.open("ru/"+p.to_s+".php","w")
    fh.puts(newhtml)
    fh.close

    title_output = '$_' + p.to_s + '= "'+ line +'";'
    fi = File.open("ru/title_russia.php","a")
    fi.puts(title_output)
    fi.close### output the titile

    p=p.succ

    sleep(5)
end
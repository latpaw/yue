require 'nokogiri'
require 'open-uri'
require 'mechanize'

class Spider
  def main(page,keyword)
     @keyword = keyword
     a = Mechanize.new { |agent|
      agent.user_agent_alias = 'Mac Safari'
     }

    a.get("http://www.yandex.com/yandsearch?text=#{keyword}&p=#{page}") do |doc|

     vars = ""
     doc.search('li.b-serp-item').each do |content|
        content.search('h2 a').each do |a|
         para = a.content
         vars << '<h5><a href="#" title="' + a.content + '">' + a.content + '</a></h5>'
         vars << "\n"
        end
        content.search('.b-serp-item__text').each do |p|
         vars << '<p>'+ p.content + '</p><br />'
         vars << "\n"
        end
     end
      return vars
    end
    
  end

  def html(keyword)
     y = 1.upto(2).collect {|x| x}
     return y.collect {|x| main(x,keyword)}.join(" ")
  end

end

i=1
IO.foreach("keyword") do |line|
    line = line.chop
    newspider = Spider.new
    newhtml = newspider.html(line)
    newhtml.gsub!(/metso|sandvik|terex|shanbao|sbm|shibang|liming|zenith/i,"Zenith")
    newhtml.gsub!(/[\w]+@[\w]+.(com|net|org|cn)/,"")
    newhtml.gsub!(/[\d]{5,12}/,"")
    newhtml.gsub!(/'/,"")
    newhtml = "<?php $title='"+line+"'; $content='"+ newhtml +"'; include('head.php'); include('foot.php'); ?>"
    # line2 = line.split.join("-")
    fh = File.open(i.to_s+".php","w")
    fh.puts(newhtml)
    fh.close

    title_output = '$_' + i.to_s + '= "'+ line +'";'
    fi = File.open("title.php","a")
    fi.puts(title_output)
    fi.close
    i=i.succ
end
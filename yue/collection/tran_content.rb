require 'nokogiri'
require 'open-uri'
require 'mechanize'

class Tran
  def main(lan,texts)
     a = Mechanize.new do |agent|
      agent.user_agent_alias = 'Mac Safari'
      # agent.set_proxy("172.16.2.139",8087)
     end

    a.get("http://www.translate.google.cn/?hl=zh-CN#auto/vi/") do |doc|

        result = doc.form_with(:id=>"gt-form") do |f|
           f.sl = "en"
           f.tl = "vi"
           f.text = texts
           # puts texts
        end.click_button

      result.search("#result_box").each do |outputs|
         return outputs.content
      end
    end
    
  end

end


  def gettext(link)
      b = Mechanize.new do |agent|
        agent.user_agent_alias = 'Mac Safari'
      # agent.set_proxy("172.16.2.139",8087)
      end


      b.get(link) do |doc|
        doc.search(".left_content2").each do |output|
         texts = output
         tran = Tran.new
         return tran.main("vi",texts)
        end
      end
  end

i=1

 # result = gettext("http://crusherstone.com/products/impact-crusher.html")
IO.foreach("links") do |line|
    fi = File.open(i.to_s+".html","w")
    line = line.chop
    result = gettext(line)
    fi.puts(result)
    fi.close
    i = i.succ
end

#     newhtml.gsub!(/metso|sandvik|terex|shanbao|sbm|shibang|liming|zenith/i,"Zenith")
#     newhtml.gsub!(/[\w]+@[\w]+.(com|net|org|cn)/,"")
#     newhtml.gsub!(/[\d]{5,12}/,"")
#     newhtml.gsub!(/'/,"")
#     newhtml = "<?php $title='"+line+"'; $content='<ul class=\"byul\">"+ newhtml +"</ul>'; include('head.php'); include('foot.php'); ?>"
#     # line2 = line.split.join("-")
#     fh = File.open(i.to_s+".php","w")
#     fh.puts(newhtml)
#     fh.close

#     title_output = '$_' + i.to_s + '= "'+ line +'";'

    # fi = File.open("result","a")
    # fi.puts(result)
    # fi.close
#     i=i.succ
#     sleep(5)

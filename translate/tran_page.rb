require 'nokogiri'
require 'open-uri'
require 'mechanize'

class Tran
  def main(url)
    a = Mechanize.new do |agent|
      agent.user_agent_alias = 'Mac Safari'
      agent.set_proxy("127.0.0.1",8087)
    end

    a.get(url) do |page|

        doc = Nokogiri::HTML.parse page.content
        doc.search(".google-src-text").each do |src|
            span = src.parent
            span.remove_attribute("onmouseover")
            span.remove_attribute("onmouseout")
            span.name = ""
            src.remove
        end
        doc.search("a").each do |link|
            linksplit = link["href"].split("=")
            linksplit.each do |http|
               if http.index("http") && !http.index("google")
                 linknew = http.gsub(/&usg/,"")
                 link["href"] = linknew
               end
            end
        end

        doc.search("script").each do |sc|
            scs = sc.to_s
            if scs.index("translate") || scs.index("responseStart") || scs.index("_setupIW")
                sc.remove
            else
            end
        end

        doc.search("style").each do |st|
            sts = st.to_s
            if sts.index("google-src")
                st.remove
            end
        end

        doc.search("meta").each do |st|
            sts = st.to_s
            if sts.index("Google") || sts.index("description") || sts.index("keywords")
                st.remove
            end
        end

        doc.search("link").each do |st|
            sts = st.to_s
            if sts.index("hreflang")
                st.remove
            end
        end
        doc.search("base").each do |st|
                st.remove
        end  
        doc.search("iframe").each do |st|
                st.remove
        end
        doc.search("body").each do |ol|
                ol.remove_attribute("onload")
        end

        htmls = doc.to_html
        htmls.gsub!(/<>/,"")
        htmls.gsub!(/<\/>/,"")
        puts htmls
     
    end
   end
    
end


def get_url(url)
    c = Mechanize.new do |agent|
      agent.user_agent_alias = 'Mac Safari'
      agent.set_proxy("127.0.0.1",8087)
    end

    c.get(url) do |page|
      tran = Tran.new
      page.search("a").each do |a|
       _url = a["href"]
       tran.main(_url)
      end

    end
end

    b = Mechanize.new do |agent|
      agent.user_agent_alias = 'Mac Safari'
      agent.set_proxy("127.0.0.1",8087)
    end
    
    somelink = "http://crusherstone.com/products/cone-crusher.html"
    somelink = URI.escape("http://translate.google.com/translate?hl=zh-CN&sl=auto&tl=zh-CN&u="+somelink)
    b.get(somelink) do |page|
     
      page.search("iframe").each do |frame|
        url = "http://translate.google.com"+frame["src"].to_s
        get_url(url)
      end

    end



# i=661
# IO.foreach("keyword") do |line|
#     line = line.chop
#     newspider = Spider.new
#     newhtml = newspider.html(line)
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
#     fi = File.open("title.php","a")
#     fi.puts(title_output)
#     fi.close
#     i=i.succ
#     sleep(5)
# end
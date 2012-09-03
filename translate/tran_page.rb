# Function: Translate a page from some language to another
# Author: Emerson
# Author URL: http://www.latpaw.me

require 'nokogiri'
require 'open-uri'
require 'mechanize'
require 'fileutils'

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
        return htmls
     
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
      return tran.main(_url)
      end

    end
end

def init(link)
    b = Mechanize.new do |agent|
      agent.user_agent_alias = 'Mac Safari'
      agent.set_proxy("127.0.0.1",8087)
    end
    
    somelink = link
    somelink = URI.escape("http://translate.google.com/translate?hl=zh-CN&sl=auto&tl=es&u="+somelink)
    b.get(somelink) do |page|
     
      page.search("iframe").each do |frame|
        url = "http://translate.google.com"+frame["src"].to_s
       return get_url(url)
      end

    end
end


# i=661


IO.foreach("links") do |line|
    line = line.chop
    # newspider = Spider.new
    unless line.nil?
        result = init(line)

        path = line.split("/")
        len = path.length



        if len == 4
        rpath =  path[3]
        # rpath = rpath.join("/")
        else
        rpath = path[3..(len-2)]
        rpath = rpath.join("/")
        FileUtils.makedirs(rpath)
        rpath = rpath + "/" + path[len-1]
        end
        

        fh = File.open(rpath,"w")
        fh.puts(result)
        fh.close


        sleep(5)
    end
end
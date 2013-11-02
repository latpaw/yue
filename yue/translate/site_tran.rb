# Function: Translate a page from some language to another
# Author: Emerson
# Author URL: http://www.latpaw.me
#
#
#
# Help: irb > load "site_tran.rb"
#       irb > tran  // this make the translation from all to es, and the site is set to self.It will make a dir 
#                      in the current path with the name of es.
# You can use it this way too:
#       irb > load "site_tran.rb"
#       irb > tran("fr","www.crusherstone.com")
#
#
#

require 'nokogiri'
require 'open-uri'
require 'mechanize'
require 'fileutils'

class Tran
  def main(url)
    a = Mechanize.new do |agent|
      agent.user_agent_alias = 'Mac Safari'
      agent.set_proxy("172.16.1.179",808)
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
            unless link["href"].nil?
                linksplit = link["href"].split("=")
                linksplit.each do |http|
                   if http.index("http") && !http.index("google")
                     linknew = http.gsub(/&usg/,"")
                     link["href"] = linknew
                   end
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
      agent.set_proxy("172.16.1.179",808)
    end

    c.get(url) do |page|
      tran = Tran.new
      page.search("a").each do |a|
       _url = a["href"]
      return tran.main(_url)
      end

    end
end

def init(link,lan)
    b = Mechanize.new do |agent|
      agent.user_agent_alias = 'Mac Safari'
      agent.set_proxy("172.16.1.179",808)
    end
    
    somelink = link
    somelink = URI.escape("http://translate.google.com/translate?hl=zh-CN&sl=auto&tl=#{lan}&u="+somelink)
    b.get(somelink) do |page|
     
      page.search("iframe").each do |frame|
        url = "http://translate.google.com"+frame["src"].to_s
       return get_url(url)
      end

    end
end


def tran(lan="es",site=nil)
    i = 0
    alline = IO.readlines("links")
    linum = alline.size 
    IO.foreach("links") do |line|
        line = line.chop
        # newspider = Spider.new
        unless line.nil?
            result = init(line,lan)

            path = line.split("/")
            path_last = path.last
            
            unless (path_last.include? "htm" )
                unless path_last.include? "php"
                    path = path + ["index.html"]
                end
            end

            len = path.length

            sitefrom = path[2]
            if site.nil?
              result.gsub!(/#{sitefrom}/,sitefrom+"/"+lan)
            else
              result.gsub!(/#{sitefrom}/,site)
            end

            lanp = lan + "/"
            if len == 4
            rpath =  path[3]
            # rpath = rpath.join("/")
            FileUtils.makedirs(lan)
            rpath = lanp+rpath
            else
            rpath = path[3..(len-2)]
            rpath = lanp + rpath.join("/")
            FileUtils.makedirs(rpath)
            rpath = rpath + "/" + path[len-1]
            end
            
            fh = File.open(rpath,"w")
            fh.puts(result)
            fh.close

            i=i+1
            per = i*100/linum
            puts "The translation has been #{i} lines, almost #{per}%"
            sleep(10)
        end
    end
    return "Complete to #{lan}, Congratulations !! "
end

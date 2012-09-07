require 'nokogiri'
require 'open-uri'
require 'mechanize'
require 'fileutils'
require 'set'

def get_image_css(uri,set)
    a = Mechanize.new do |agent|
      agent.user_agent_alias = 'Mac Safari'
      # agent.set_proxy("172.16.2.139",8087)
    end
    
    a.get(uri) do |doc|
        doc.search('img').each do |content|
           imgsrc = content["src"]
           fetch(uri,imgsrc,set)  
        end
        doc.search('link').each do |content|
           csshref = content["href"]
           fetch(uri,csshref,set)
        end
    end
    return set
end

def fetch(uri,imgsrc,set)
           split_uri = uri.split("/")
           path = imgsrc.split("/") 
           if path[0] != "http" && path[0] != "" #if relative path,and not /
              n=0
              path.each {|i| n=n.succ if i==".."}
              path.delete("..")
              path_tmp = path.join("/")
              n = n + 2
              split_uri_len = split_uri.length
              new_uri = split_uri[0..split_uri_len-n]
              imgsrc = new_uri.join("/") + "/" + path_tmp
           end
           if path[0] == ""
              array_tmp = [split_uri[0],split_uri[1],split_uri[2]]
              new_uri = array_tmp.join("/")
              imgsrc = new_uri + imgsrc
           end
           return set << imgsrc
end

set = Set[]
IO.foreach("links") do |line|
  line = line.chop
  get_image_css(line,set)
end


  set.each do |imgsrc|
       path = imgsrc.split("/")
       img = open(imgsrc) {|f| f.read}
       path.delete(path[0])
       path.delete(path[0])
       path.delete(path[0])
       len = path.length
       filename = path[len-1]
       if len != 1
           newpath = path[0..len-2]
           newpath = newpath.join("/")+"/"
           FileUtils.makedirs("img/"+newpath)
       else
           newpath = ""
       end
       open("img/"+newpath+filename,"wb") {|f| f.write(img)}
  end

  # set.each do |link|
  #   if link.index("css")
  #       csspath = link.split("/")
  #       csspath = csspath[3..csspath.length-1]
  #       csspath = img+"/"+csspath.join("/")
  #       fh = File.open(csspath,"r")

  #   end
  # end
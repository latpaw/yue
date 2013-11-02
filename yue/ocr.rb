# encoding: utf-8

require 'rtesseract'
require 'mini_magick'

def parse_price(price_url)
  img = MiniMagick::Image.open(price_url)
  img.resize '200x100'   # 放大
  img.colorspace("GRAY") # 灰度化  
  img.monochrome         # 去色
  str = RTesseract.new(img.path).to_s # 识别
  File.unlink(img.path)  # 删除临时文件
  if str.nil?
    puts price_url
  else
    price = str.strip.sub(/Y/,'').to_f 
  end
end
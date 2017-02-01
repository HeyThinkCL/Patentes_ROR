module ApplicationHelper


  def limit(indata,num)
    d = indata.split("/")
    o = d.length - num
    if o > 0
      out = []
      ix = 0
      d.each { |x|
      if ix <= num
        out.push(x)
      else
        break
      end
        ix = ix+1
      }
      out = out.join("/")
    else
      out=d.join("/")
    end
    return out


  end

  def active(url,level=3)
    compare =limit(request.path,level)
      if url == compare
      return "active"
    end
    return ""
  end

  def open(url)
    compare =limit(request.path,3)
    if url == compare
      return "open"
    end
    return ""
  end
end

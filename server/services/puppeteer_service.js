const puppeteer = require('puppeteer')

async function fill_form(review) {
  const browser = await puppeteer.launch({headless:true})
  const page = await browser.newPage()
  
  await page.goto('https://docs.google.com/forms/d/e/1FAIpQLScJBivr5VRrKFmY_F5WZ3UutVYvHpV7iZGeuj8tnuMvZl_7qA/viewform')  

  await page.setViewport({width: 1080, height: 1024})

  await page.waitForNavigation()

  await page.waitForSelector('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(1) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input')

  await page.type('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(1) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input', review.class_name)

  await page.click(`#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(2) > div > div > div.PY6Xd > div > span > div > label:nth-child(${review.difficulty+1}) > div.eRqjfd > div > div`)

  await page.type('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(3) > div > div > div.AgroKb > div > div.RpC4Ne.oJeWuf > div.Pc9Gce.Wic03c > textarea', review.additional_comments)

  await page.click('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.ThHDze > div.DE3NNc.CekdCb > div.lRwqcd > div > span > span')  
 
  await page.waitForNavigation()

  await browser.close()
  console.log("successfully filled google form")
}

module.exports = fill_form; 

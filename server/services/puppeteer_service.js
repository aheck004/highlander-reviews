const puppeteer = require('puppeteer')

async function fill_form(review) {
  try{
    const browser = await puppeteer.launch({headless: 'new'})
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
  }
  catch {
    console.log("COULD NOT FILL GOOGLE FORM")
    return
  } 
  
  console.log("successfully filled google form")
}

async function web_scrape() {
  try{
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    
    console.log("going to website")
    await page.goto('https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/registration/registration')

    await page.setViewport({width:1080, height:1024})

    await page.waitForSelector('#catalogSearchLink')

    await page.click('#catalogSearchLink')

    await page.waitForSelector('#s2id_autogen1')

    await page.type('#s2id_autogen1', "2023")

    console.log("waiting for selectable results")
    await page.waitForSelector('#select2-results-1')
  
    console.log("clicking on first result")
    await page.waitForSelector('#select2-results-1 > li.select2-results-dept-0.select2-result.select2-result-selectable.select2-highlighted')
    await page.keyboard.press('Enter')

    console.log("clicking on term go button")
    await page.click('#term-go')

    console.log("waiting for navigation")
    await page.waitForNavigation()

    console.log("clicking on search-go button")
    await page.click('#search-go')

    console.log("waiting for table")
    await page.waitForSelector('#table1 > tbody')

    console.log("waiting for total pages div to load")
    await page.waitForSelector('#searchResultsTable > div.bottom.ui-widget-header > div > span.paging-text.total-pages')

    const page_size = 10

    console.log("evaluation total pages")
    const total_pages = await page.$eval('#searchResultsTable > div.bottom.ui-widget-header > div > span.paging-text.total-pages', 
    (element) => {return parseInt(element.textContent)})
  
    console.log(total_pages)

    for (let page_number = 1; page_number < total_pages; page_number++) {
      for (let table_element = 1; table_element < page_size; table_element++) {
        await page.click(`#table1 > tbody > tr:nth-child(${table_element}) > td:nth-child(4) > a`)
        await page.waitForSelector('body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable.course-details-dialog', {hidden:false})

        // Extract the course title
        console.log("Extracting course title")
        await page.waitForSelector('#courseDetailsContentDetailsDiv > div')
        const courseTitle = await page.$eval('.status-bold', 
          (element) => {
            return element.textContent
          }
        )
        console.log('Course Title:', courseTitle.trim());
        
        //Extract the course description
        console.log("Extracting course description")
        await page.waitForSelector('#courseDescription > a')
        await page.keyboard.press('ArrowDown')
        await page.waitForSelector('#courseDetailsContentDetailsDiv')
        const course_description = await page.$eval('#courseDetailsContentDetailsDiv', 
          (course_desc) => {
            return course_desc.textContent
          } 
        )
        console.log("Course Description:", course_description.trim())

        //Closing Course Information Window
        await page.click('body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable.course-details-dialog > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button')
        await page.waitForSelector('body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable.course-details-dialog', {hidden:true})
      }
      await page.click('#searchResultsTable > div.bottom.ui-widget-header > div > button.paging-control.next.ltr.enabled')
    }
    await browser.close()

    console.log("Successfully Scraped UCR Course Catalog")
  }catch (err) {
    console.log("Web Scape failed", err)
  }
}

module.exports = { fill_form, web_scrape }; 

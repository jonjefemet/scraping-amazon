const puppeteer = require("puppeteer");
const connection = require("../database/connection")

exports.getInfoWeb = async (req, res) => {
    let response = {
        success: true,
        data: [],
        errors: []
    }

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.amazon.com.mx/gp/bestsellers/?ref_=nav_cs_bestsellers.')

    try {

        const informations = await page.$$('div[class="zg_homeWidget"]')

        for (const information of informations) {
            let info = {
                category: await information.$eval(("h3"), (element) => element.innerText),
                products: []
            }

            const products = await information.$$('div[class="zg_item zg_homeWidgetItem"]')
            for (const product of products) {


                let [id, imageUrl, name, total, value] = await Promise.all([
                    new Promise((resolve, reject) => {
                        product.$eval('div[class="a-section a-spacing-none p13n-asin"]', element => element.getAttribute("data-p13n-asin-metadata"))
                            .then(value => {
                                resolve(JSON.parse(value).asin)
                            }).catch((error) => {
                                resolve("")
                            })
                    }),
                    new Promise((resolve, reject) => {
                        product.$eval(("img"), (element) => element.getAttribute("src"))
                            .then(value => {
                                resolve(value)
                            }).catch((error) => {
                                resolve("")
                            })
                    }),
                    new Promise((resolve, reject) => {
                        product.$eval('.p13n-sc-truncated', element => element.textContent)
                            .then(value => {
                                resolve(value)
                            }).catch((error) => {
                                console.log(error);
                                resolve("")
                            })
                    }),
                    new Promise((resolve, reject) => {
                        product.$eval('a[class="a-size-small a-link-normal"]', element => element.innerText)
                            .then(value => {
                                resolve(value)
                            }).catch((error) => {
                                resolve(0)
                            })
                    }),
                    new Promise((resolve, reject) => {
                        product.$eval('span[class="a-icon-alt"]', element => element.innerText)
                            .then(value => {
                                resolve(value.substr(0, 3))
                            }).catch((error) => {
                                resolve(0)
                            })
                    }),
                ])

                info.products.push({
                    id: id,
                    name: name,
                    imageUrl: imageUrl,
                    rating: {
                        total: total,
                        value: value,
                    }
                })
            }


            response.data.push(info)
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            data: [],
            errors: [
                {
                    error: "AMAZON_ERROR",
                    status: 400,
                    message: error.message
                }
            ]
        })
    }
    await browser.close()
    res.json(response)
}

exports.test = async (req, res) => {
    const info = await connection('todos')

    res.json(info)
    //res.send("Kokoro no Junbi OK!")
}
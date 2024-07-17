var express = require('express');
var router = express.Router();
const mailchimp = require("@mailchimp/mailchimp_marketing")
const md5 = require("md5");

/* GET users listing. */
router.get('/', async function (req, res, next) {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_KEY,
    server: "us10"
  });
  if (req.query.email) {
    const email = req.query.email;
    const listId = "64df6ac5cf";
    const subscriberHash = md5(email);
    let tag = "";
    switch (req.query.tag) {
        case "direct" :
            tag = "direct"
            break;
        case "media-kit" :
            tag = "media-kit"
            break;
        default:
            tag = "4 Rent Maybe Interested"
    }

    try{
      await mailchimp.lists.updateListMemberTags(
          listId,
          subscriberHash,
          {
            tags: [
                {
                  name: tag,
                  status: "active",
                },
            ],
          }
      );
    } catch (e){
      console.log(e);
    }



  }

  res.render('index', {title: '4RENT BLACKHILLS'});
});

module.exports = router;

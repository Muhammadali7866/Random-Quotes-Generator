// all about quotes controller
const sendEmail = require("../utils/sendMail");

// now import first
const db = require("../models");
const cathAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const cron = require("node-cron");
const { QuotesMap } = require("../models");
const { use } = require("../app");

const Quote = db.Quote;
const User = db.User;
const quoteMap = db.QuotesMap;

// create quote
exports.createQuote = cathAsync(async (req, res, next) => {
  const { quotesType, description } = req.body;
  console.log(quotesType, description);

  // 1) if not data
  if (!quotesType || !description) {
    return next(new appError("please provide quoteType and description", 400));
  }

  // 2) if already exit quote
  const exitQuote = await Quote.findOne({
    where: { description: description },
  });
  if (exitQuote) {
    return next(
      next(
        new appError("This Quote is already exit please try another one", 401)
      )
    );
  }

  // 3) create the quote
  const quote = await Quote.create({ quotesType, description });
  await sendEmail({
    email: "malik171234@gmail.com",
    subject: "Testing purspose",
    message: "testing the quote send email",
  });

  return res.status(201).json({
    message: "Success",
    data: {
      quote,
    },
  });
});

// send quote to the mail
async function sendQuote(req, res, next) {
  try {
    // firstly fetch id and email from the user table
    const userAttributes = await User.findAll({
      attributes: ["id", "email"],
    });

    const userMapData = userAttributes.map((values) => ({
      id: values.id,
      email: values.email,
    }));

    //  1) firstly fetch all the types from user

    for (const users of userMapData) {
      const userTypeFetch = await QuotesMap.findAll({
        where: { userId: users.id },
        attributes: ["type"],
      });

      //  2) refine types from the user data
      const types = userTypeFetch.map((quoteMap) => quoteMap.type);
      console.log("ALl types  of user is", types);

      // 3) fetch the description according to the type from quotes table

      //3.1 generate random types if more than one
      let randomType = types;
      if (types.length > 1) {
        const randomIndex = Math.floor(Math.random() * types.length);
        randomType = types[randomIndex];
        // console.log(randomType);
      }
      //   3.2 now fetch description
      const desc = await Quote.findAll({
        where: { quotesType: randomType },
      });
      const descriptions = desc.map((values) => values.description);
      console.log("All description maps are ", descriptions);

      //   generate random decription
      const randomIndex = Math.floor(Math.random() * descriptions.length);
      const randomDescription = descriptions[randomIndex];

      // now send email user with type
      await sendEmail({
        email: users.email,
        subject: randomType,
        message: randomDescription,
      });
      console.log(
        `The user id=${users.id} and email=${users.email}....Type is=${randomType} and description is=${randomDescription}`
      );
      // }
    }
  } catch (err) {
    console.log(err.message);
  }
}

cron.schedule("*/1 * * * *", sendQuote);

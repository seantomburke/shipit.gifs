[![Build Status](https://travis-ci.org/seantomburke/shipit.gifs.svg?branch=master)](https://travis-ci.org/seantomburke/shipit.gifs)![](https://github.com/seantomburke/shipit.gifs/workflows/.github/workflows/npmpublish.yml/badge.svg)![](https://github.com/seantomburke/shipit.gifs/workflows/.github/workflows/npmtestpullrequest.yml/badge.svg)![](https://github.com/seantomburke/shipit.gifs/workflows/.github/workflows/versionbump.yml/badge.svg)

# [shipit.gifs](https://www.shipit.today)
The database of GIFs for https://www.shipit.today

![](https://i.shipit.today)

# How to Contribute

## General Rules
+ Be a good person
+ Add GIFs that can be used in the context of shipping code reviews, design reviews or just any "Looks good to me" or "Ship it!" moments
+ You can add as many as you'd like
+ Use GIFs at a reasonable size, no more than 5MB.
+ GIFs should come from one of the approved domains in [domains.json](domains.json)
+ GIFs need to pass all tests and be approved in a Pull Request.
+ Keep names all lowercase, the only special character that is allowed is a dash `-`.
+ Include all fields: `_id`, `name`, `url`, `description`, `active`.
+ Don't remove or rename any previously submitted GIFs as they could be used in the wild already.
+ If a GIF is broken, mark the active state to 0 or fix the URL.
+ Add a description so it is easy to understand the content of the GIF without opening it.
+ No graphic content.

## Rules that will be tested

+ The existing entries cannot be removed
+ The existing names cannot be changed
+ The _id is required
+ The _id needs to be the same as its index in the array
+ The _id needs to be a number
+ The name is required
+ The name must be less than 50 characters
+ The name must be greater than 1 character
+ The name must be unique
+ The name must only contain lowercase letters, numbers and dashes (-)
+ The name must start with a lowercase letter
+ The url paths must be unique
+ The url is required
+ The url must be less than 2000 characters
+ The url protocol must start with https://
+ The url domain must be an approved domain
+ The url must not have query params
+ The url must not have a fragment
+ The url path must end with .gif
+ The description cannot contain special characters
+ The description is required
+ The description must be less than 200 characters
+ The active state is required

## Structure of new submissions

```json
{
    "gifs": [
        {
            "_id": 10,
            "name": "someuniquename",
            "url": "https://foo.com/some.gif",
            "description": "Some description",
            "active": 1
        }
    ]
}
```

## Submitting a contribution

1. Add your gif to the end of the gifs array in [`gifs.json`](https://github.com/seantomburke/shipit.gifs/blob/master/gifs.json) with the correct JSON structure
2. Run `npm test` to make sure everything passes
3. Create a pull request with the 2 file changes
4. Make sure to include the GIF in an image tag in the comment section of the Pull Request for easy review
5. Wait for submission to be approved

Created by [@seantomburke](https://www.linkedin.com/in/seanthomasburke) ©2020

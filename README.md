# shipit.gifs
The database of GIFs for https://shipit.today

![](https://i.shipit.today)

# How to Contribute

## General Rules
+ Be a good person
+ Add GIFs that can be used in the context of shipping code reviews, design reviews or just any "Looks good to me" moment
+ You can add as many as you'd like
+ Use GIFs at a reasonable size, no more than 5MB.
+ GIFs need to pass all tests and be approved in a Pull Request.
+ Keep names all lowercase, the only special character that is allowed is a dash `-`.
+ Include all fields: `_id`, `name`, `url`, `description`, `active`.
+ Don't remove or rename any previously submitted GIFs as they could be used in the wild already.
+ If a GIF is broken, mark the active state to 0 or fix the URL.
+ Add a description so it is easy to understand the content of the GIF without opening it.
+ No graphic content.

## Rules that will be tested

1. The existing names cannot be changed
2. The existing entries cannot be removed
3. The _id is required
4. The _id needs to be the same as its index in the array
5. The _id needs to be a number
6. The name is required
7. The name must be less than 50 characters
8. The name must be unique
9. The name must only contain lowercase letters, numbers and dashes (-)
10. The name must start with a lowercase letter
11. The url is required
12. The url must be less than 2000 characters
13. The description is required
14. The description must be less than 200 characters
15. The active state is required

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

1. Add your gif to the end of the gifs array in `gifs.json` with the correct JSON structure
2. Run `npm test` to make sure everything passes
3. Run `npm build` to generate the updated `.cache.json` file
4. Create a pull request with the 2 file changes
5. Make sure to include the GIF in an image tag in the comment section for easy review
6. Wait for submission to be approved

Created by [@seantomburke](https://www.linkedin.com/in/seanthomasburke) ©2020
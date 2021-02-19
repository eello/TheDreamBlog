const URL = "http://101.101.210.243/thedream.api/post";
const postCreateForm = document.querySelector(".post-create-form");
const btnSubmit = document.querySelector(".btn-post-create");

function parsingTags() {
  const parsedTags = [];
  postCreateForm
    .querySelector("textarea[name='tags']")
    .value.split("#")
    .forEach((tag) => {
      if (tag !== "") {
        if (tag.trim() !== "") {
          parsedTags.push(tag.trim());
        }
      }
    });
  return parsedTags;
}

function handleSubmit(e) {
  e.preventDefault();
  const subject = postCreateForm.querySelector("input[name='subject']").value;
  const link = postCreateForm.querySelector("input[name='link']").value;
  const thumbnailUrl = postCreateForm.querySelector("input[name='thumbnailUrl']").value;
  const description = postCreateForm.querySelector("textarea[name='description']").value;
  const tags = parsingTags();

  const data = {
    subject,
    link,
    thumbnailUrl,
    description,
    tags,
  };

  postRequest(data);
}

function postRequest(data) {
  fetch(URL, {
    method: "POST", // or 'PUT'

    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    console.log(res);
    if (String(res.status) === "201") {
      console.log("Success !");
      location.assign("/client/postList.html");
    } else {
      console.log("Error ! ", res.status);
    }
  });
  //   .then((response) => console.log("Success:", JSON.stringify(response)))
  //   .catch((error) => console.error("Error:", error));
}

function init() {
  btnSubmit.addEventListener("click", handleSubmit);
}

init();

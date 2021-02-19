const URL = "http://101.101.210.243/thedream.api/post";
const postListTable = document.querySelector(".post-list-table");

function getPostList() {
  fetch(URL, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      if (String(res.status) === "200") {
        return res.json();
      } else {
        console.log("Error ! ", res.status);
      }
    })
    .then((response) => {
      console.log("Success: ", response);
      printPostList(response);
    });
  //   .then((response) => console.log("Success:", JSON.stringify(response)))
  //   .catch((error) => console.error("Error:", error));
}

// <td><a href=""></a></td>
// <td>on1ystar</td>
// <td>2020-02-13</td>
// <td><input type="checkbox" name="post-delete" id="1" /><label class="post-delete-btn" for="1"></label></td>
function printPostList(postList) {
  console.log(postList);
  postList.map((element) => {
    const date = element.createdAt.split("T");
    const post = `<tr>
                    <td><a href="${element.link}">${element.subject}</a></td>
                    <td>${element.writer}</td>
                    <td>${date[0]}</td>
                    <td><input type="checkbox" name="post-delete" id="1" /><label class="post-delete-btn" for="1"></label></td>
                </tr>`;
    postListTable.insertAdjacentHTML("beforeend", post);
  });
}
function init() {
  getPostList();
}

init();

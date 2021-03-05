const URL = "http://101.101.210.243/thedream.api/project";
const projectListTable = document.querySelector(".project-list-table");

function getprojectList() {
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
      printprojectList(response);
    });
  //   .then((response) => console.log("Success:", JSON.stringify(response)))
  //   .catch((error) => console.error("Error:", error));
}

// <td><a href=""></a></td>
// <td>on1ystar</td>
// <td>2020-02-13</td>
// <td><input type="checkbox" name="project-delete" id="1" /><label class="project-delete-btn" for="1"></label></td>
function printprojectList(projectList) {
  console.log(projectList);
  projectList.map((element) => {
    const project = `<tr>
                    <td><a href="">${element.subject}</a></td>
                    <td>${element.writer}</td>
                    <td></td>
                    <td><input type="checkbox" name="project-delete" id="1" /><label class="project-delete-btn" for="1"></label></td>
                </tr>`;
    projectListTable.insertAdjacentHTML("beforeend", project);
  });
}

function init() {
  getprojectList();
}

init();

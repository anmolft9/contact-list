const apiUrl = "https://randomuser.me/api/?";
let userArgs = [];

const fetchUser = async (params = "results=20") => {
  fetch(apiUrl + params) //fetching the data
    .then((response) => response.json()) //to change it into json object
    .then((data) => {
      //accessing the object through data
      userArgs = data.results; //pushing to the empty array
      //   console.log(userArgs);
      display(); //calling the display function after the data has been fetched
    })
    .catch((err) => console.log(err));
};

/// function to display in card format

const display = (args = userArgs) => {
  let str = "";
  args.map((user, i) => {
    str += `
      <div class="col-md-6 col-lg-4 mb-5 ">
                 <div class="card">
                   <img src ="${user.picture.large}" class="card-img-top" alt="..." />
                   <div class="card-body">
                     <h5 class="card-title ">${user.name.title} ${user.name.first} ${user.name.last}</h5>
                     <div class="card-text">
                     <ul class="list-group contact-icons">
                     <li class="list-group-item">
                     <i class="fa-solid fa-phone"></i> ${user.cell}</li>
                     <li class="list-group-item"><i class="fa-solid fa-envelope"></i> ${user.email}</li>
                     <li class="list-group-item"><i class="fa-solid fa-location-dot"></i> ${user.location.street.number} ${user.location.street.name} ${user.location.city} ${user.location.state} ${user.location.postcode}</li>

                     
                   </ul>
                     </div>
                     
                   </div>
                 </div>
               </div>
      `;
  });
  document.getElementById("user-list").innerHTML = str;
  document.getElementById("user-count").innerText = args.length;

  //   console.log(args);
};

const handleOnChange = (e) => {
  const qryStrings = "results=20&gender=" + e.value;

  fetchUser(qryStrings);
};

const handleOnSearch = (e) => {
  const str = e.value;
  const selectedUser = userArgs.filter((user) => {
    const name = user.name.first + " " + user.name.last;
    return name.toLowerCase().includes(str.toLowerCase());
  });
  display(selectedUser);
};

fetchUser();

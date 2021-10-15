var theme = document.getElementById("change");
var sun = document.getElementById("sun");
var moon = document.getElementById("moon");
var primary = document.getElementById("html");
var form = document.getElementById("search_bar");

if (window.matchMedia) {
  // Check if the dark-mode Media-Query matches
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    moon.style.display = "none"
    sun.style.display = "block"
    primary.classList = "theme_dark"
  } else {
    // Light
  }
} else {
  // Default (when Media-Queries are not supported)
}

theme.onclick = function toggle() {
  primary.classList.toggle("theme_dark");
  if (moon.style.display === "block") {
    moon.style.display = "none";
    sun.style.display = "block";

  }
  else {
    moon.style.display = "block";
    sun.style.display = "none";
  }
};

window.addEventListener("load", (e) => {
  request("octocat");

});

var button = document.getElementById("button");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let input = document.getElementById("search_x").value.trim();
  let searchName = input.split(" ").join("");
  if (searchName) {
    request(searchName);
  } else {
    document.getElementById("hide").style.visibility = "visible";
  }
});

const request = (searchName) => {
  fetch("https://api.github.com/users/" + searchName)
    .then(function (response) {
      if (response.status !== 200) {
        document.getElementById("hide").style.visibility = "visible";
      } else {
        document.getElementById("hide").style.visibility = "hidden";
      }
      return response.json();
    })
    .then(function (data) {
      if (data.hasOwnProperty("message")) {
        document.getElementById("hide").style.display = "visible";
        return;
      } else if (data.bio) {
        document.getElementById("bio").innerHTML = data.bio;
      } else {
        document.getElementById("bio").innerHTML = "This profil has no bio";
      }
      if (data.name) {
        document.getElementById("h4").innerHTML = data.name;
      } else {
        document.getElementById("h4").innerHTML = "This profil has no Name";
      }
      if (data.twitter_username) {
        document.getElementById("twitter_text").innerHTML =
          data.twitter_username;
      } else {
        document.getElementById("twitter_text").innerHTML = "Not Available";
        document.getElementById("twiter").style.opacity = "0.5";
      }

      if (data.company) {
        document.getElementById("company_text").innerHTML = data.company;
      } else {
        document.getElementById("company_text").innerHTML = "Not Available";
        document.getElementById("icompany").style.opacity = "0.5";
      }

      if (data.blog) {
        document.getElementById("website").innerHTML = data.blog;
      } else {
        document.getElementById("website").innerHTML = "Not Available";
        document.getElementById("link").style.opacity = "0.5";
      }

      if (data.location) {
        document.getElementById("location_text").innerHTML = data.location;
      } else {
        document.getElementById("location_text").innerHTML = "Not Available";
        document.getElementById("loction").style.opacity = "0.5";
      }

      let date = new Date(data.created_at);
      let newFormat =
        date.getDate() +
        " " +
        date.toLocaleString("en-us", { month: "short" }) +
        " " +
        date.getFullYear();
      document.getElementById("user_join").innerHTML = newFormat;

      document.getElementById("repos").innerHTML = data.public_repos;
      document.getElementById("followers").innerHTML = data.followers;
      document.getElementById("following").innerHTML = data.following;
      document.getElementById("user_login").innerHTML = data.login;
      document.getElementById("avatar_img").src = data.avatar_url;
    });
};

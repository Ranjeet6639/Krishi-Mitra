     // Menu toggle
    function toggleMenu() {
      document.getElementById("navLinks").classList.toggle("show");
    }

    const form = document.getElementById("registrationForm");
    const errorMsg = document.getElementById("errorMsg");
     //submit function
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      errorMsg.textContent = "";

      //email,mobile,password,pincode verification
      const email = document.getElementById("email").value;
      const mobile = document.getElementById("mobile").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const pincode = document.getElementById("pincode").value;

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      const mobilePattern = /^[0-9]{10}$/;
      const pincodePattern = /^[0-9]{6}$/;

      if (!email.match(emailPattern)) {
        errorMsg.textContent = "Please enter a valid email address.";
        return;
      }
      if (!mobile.match(mobilePattern)) {
        errorMsg.textContent = "Mobile number must be 10 digits.";
        return;
      }
      if (!pincode.match(pincodePattern)) {
        errorMsg.textContent = "Pincode must be 6 digits.";
        return;
      }
      if (password !== confirmPassword) {
        errorMsg.textContent = "Passwords do not match.";
        return;
      }

      alert("Registration Successful!");
      form.reset();
    });
    
     //State->District->Taluka->Village dropdown logic
     const stateSelect = document.getElementById("state");
  const districtSelect = document.getElementById("district");
  const talukaSelect = document.getElementById("taluka");
  const villageSelect = document.getElementById("village");

  const districtOtherInput = document.getElementById("districtOther");
  const talukaOtherInput = document.getElementById("talukaOther");
  const villageOtherInput = document.getElementById("villageOther");

  const locationData = {
    "Maharashtra": {
      "Pune": {
        "Haveli": ["Wagholi", "Lohegaon"],
        "Mulshi": ["Lavasa", "Pirangut"]
      },
      "Mumbai": {
        "Mumbai Suburban": ["Andheri", "Bandra"],
        "Mumbai City": ["Colaba", "Churchgate"]
      }
    },
    "Gujarat": {
      "Ahmedabad": {
        "Daskroi": ["Bopal", "Ghuma"],
        "Sanand": ["Virochannagar", "Bol"]
      },
      "Surat": {
        "Choryasi": ["Sayan", "Bamroli"],
        "Bardoli": ["Palsana", "Masma"]
      }
    },
    "Madhya Pradesh": {
      "Bhopal": {
        "Huzur": ["Berasia", "Bhopal North"],
        "Kolar": ["Kolar", "Bairagarh"]
      },
      "Indore": {
        "Indore": ["Vijay Nagar", "Rau"],
        "Depalpur": ["Hatod", "Betma"]
      }
    }
  };

  stateSelect.addEventListener("change", function () {
    const selectedState = stateSelect.value;
    resetSelect(districtSelect, "District");
    resetSelect(talukaSelect, "Taluka");
    resetSelect(villageSelect, "Village");

    districtOtherInput.style.display = "none";
    talukaOtherInput.style.display = "none";
    villageOtherInput.style.display = "none";

    if (locationData[selectedState]) {
      const districts = Object.keys(locationData[selectedState]);
      districts.forEach(district => {
        const option = document.createElement("option");
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
      });
      addOtherOption(districtSelect);
    }
  });

  districtSelect.addEventListener("change", function () {
  const selectedState = stateSelect.value;
  const selectedDistrict = districtSelect.value;

  resetSelect(talukaSelect, "Taluka");
  resetSelect(villageSelect, "Village");

  // Hide all inputs initially
  districtOtherInput.style.display = "none";
  talukaOtherInput.style.display = "none";
  villageOtherInput.style.display = "none";

  if (selectedDistrict === "Other") {
    // Show text input for "Other" district
    districtOtherInput.style.display = "block";

    // Show taluka and village as "Other" inputs because we can't populate options
    talukaSelect.innerHTML = '<option value="Other">Other</option>';
    villageSelect.innerHTML = '<option value="Other">Other</option>';
    talukaOtherInput.style.display = "block";
    villageOtherInput.style.display = "block";

    return;
  }

  // If not "Other", load taluka options normally
  if (
    locationData[selectedState] &&
    locationData[selectedState][selectedDistrict]
  ) {
    const talukas = Object.keys(locationData[selectedState][selectedDistrict]);
    talukas.forEach(taluka => {
      const option = document.createElement("option");
      option.value = taluka;
      option.textContent = taluka;
      talukaSelect.appendChild(option);
    });
    addOtherOption(talukaSelect);
  }
});


  talukaSelect.addEventListener("change", function () {
  const selectedState = stateSelect.value;
  const selectedDistrict = districtSelect.value;
  const selectedTaluka = talukaSelect.value;

  resetSelect(villageSelect, "Village");
  villageOtherInput.style.display = "none";

  if (selectedTaluka === "Other") {
    talukaOtherInput.style.display = "block";

    // Force village to "Other" if taluka is also "Other"
    villageSelect.innerHTML = '<option value="Other">Other</option>';
    villageOtherInput.style.display = "block";
    return;
  } else {
    talukaOtherInput.style.display = "none";
  }

  if (
    locationData[selectedState] &&
    locationData[selectedState][selectedDistrict] &&
    locationData[selectedState][selectedDistrict][selectedTaluka]
  ) {
    const villages = locationData[selectedState][selectedDistrict][selectedTaluka];
    villages.forEach(village => {
      const option = document.createElement("option");
      option.value = village;
      option.textContent = village;
      villageSelect.appendChild(option);
    });
    addOtherOption(villageSelect);
  }
});


  villageSelect.addEventListener("change", function () {
    if (villageSelect.value === "Other") {
      villageOtherInput.style.display = "block";
    } else {
      villageOtherInput.style.display = "none";
    }
  });

  function resetSelect(selectElement, placeholder) {
    selectElement.innerHTML = `<option value="">Select ${placeholder}</option>`;
  }

  function addOtherOption(selectElement) {
    const otherOption = document.createElement("option");
    otherOption.value = "Other";
    otherOption.textContent = "Other";
    selectElement.appendChild(otherOption);
  }

  const registrationForm = document.querySelector("form");
  const popup = document.getElementById("popup");

  registrationForm.addEventListener("submit", function(e) {
    e.preventDefault();

    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
      window.location.href = "farmer-login.html";
    }, 2000); // 2-second delay before redirect
  });

  // Profile Photo Preview + Save to Local Storage
const profilePhoto = document.getElementById("profilePhoto");
const photoPreview = document.getElementById("photoPreview");

// Load saved photo from localStorage (if any)
window.addEventListener("DOMContentLoaded", function () {
  const savedPhoto = localStorage.getItem("profilePhoto");
  if (savedPhoto) {
    photoPreview.src = savedPhoto;
  }
});

profilePhoto.addEventListener("change", function () {
  const file = profilePhoto.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target.result;

      // Show preview
      photoPreview.src = imageData;

      // Save to localStorage
      localStorage.setItem("profilePhoto", imageData);
    };
    reader.readAsDataURL(file);
  }
});
 // ✅ Block letters, symbols, spaces as user types
    const rationInput = document.getElementById("rationNumber");
    const rationError = document.getElementById("rationError");

    rationInput.addEventListener("input", (e) => {
      // Keep only numbers
      e.target.value = e.target.value.replace(/[^0-9]/g, "");

      // Optional: show live error if more than 12 digits
      if (e.target.value.length > 12) {
        e.target.value = e.target.value.slice(0, 12);
      }
    });

    // ✅ Validate before submit
    document.getElementById("myForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const rationNumber = rationInput.value.trim();
      const rationPattern = /^[0-9]{12}$/;

      if (!rationPattern.test(rationNumber)) {
        rationError.textContent = "Ration card number must be exactly 12 digits.";
      } else {
        rationError.textContent = "";
        alert("Form submitted successfully!");
        // Save to localStorage if needed:
        // localStorage.setItem("rationNumber", rationNumber);
      }
    });
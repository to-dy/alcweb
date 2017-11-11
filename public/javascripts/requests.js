var students_container = document.getElementById('students');
var student_name = document.getElementById('name');
var student_class = document.getElementById('class');
var student_id = document.getElementById('s_id');
var studentId = document.getElementById('_id');
var endpoint = 'http://localhost:3000/api/students';

function getReq(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        // console.log(status);
        if (status === 200) {
            callback(status, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();

}

function postReq(url, params, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "d3c53d9f-f730-4ca7-509e-6066a5ef6e6e");
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(status, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send(params);

}

function putReq(url, params, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "d3c53d9f-f730-4ca7-509e-6066a5ef6e6e");
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(status, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send(params);

}

function deleteReq(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "d3c53d9f-f730-4ca7-509e-6066a5ef6e6e");
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(status, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();

}

function fetchStudents() {
    getReq(
        endpoint, function (status, data) {
            if (status != null) {
                students_container.innerHTML = "";
                data.forEach(function (student) {
                    students_container.innerHTML +=
                        '<div class="card">' +
                        '<img src="' + student.pic + '" alt="" class="pic">' +
                        '<h3 class="name">' + student.name + '</h3>' +
                        '<div class="id-class">' +
                        '<p class="id">' + student.s_id + '</p>' +
                        '<p class="class">' + student.class + '</p>' +
                        '</div>' +
                        '<div class="buttons">' +
                        '<a href="#student-modal" data-toggle="modal" id="' + student.s_id + '" class="edit-btn btn" onclick="loadStudentData(this.id)">EDIT</a>' +
                        '<a href="#" class="delete-btn btn" id="' + student._id + '" onclick="deleteStudent(this.id)">DELETE</a>' +
                        '</div> </div>'
                });
            } else {
                alert("Error getting data, code: " + status);
            }
        }
    );
}

function addNewStudent() {
    var s_name = student_name.value;
    var s_class = student_class.value;
    var id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    student_id.value = id;
    var pic = "https://comingsoon.com/pic.png"
    var data = 'name=' + s_name + '&class=' + s_class + '&s_id=' + id + "&pic=" + pic;

    postReq(endpoint, data, function (status, success) {
        if (status === 200) {
            console.log("Student added successfully");
            showalert("Student added successfully", 'success');
        } else {
            showalert("Error adding student. Check values and try again", 'danger');
        }
        console.log(success);

    });

}

function updateStudent(id) {
    var s_name = student_name.value;
    var s_class = student_class.value;
    var s_id = student_id.value;
    var pic = "https://comingsoon.com/pic.png";
    var data = 'name=' + s_name + '&class=' + s_class + '&s_id=' + s_id + "&pic=" + pic;

    putReq(endpoint + '/' + id, data, function (status, success) {
        if (status === 200) {
            // console.log("Student updated successfully");
            showalert("Student updated successfully", 'success');
            fetchStudents();
        } else {
            showalert("Error updating student details", 'danger');
            // console.log("Wahala dey!");
        }
        console.log(success);

    });

}

function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        deleteReq(endpoint + '/' + id, function (status, success) {
            if (status === 200) {
                // console.log("Student deleted successfully");
                $('#notify').append('<div id="alertdiv" class="alert alert-success"> <a class="close" data-dismiss="alert">×</a><span>Student successfully deleted</span></div>');
                fetchStudents();
            } else {
                $('#notify').append('<div id="alertdiv" class="alert alert-danger"> <a class="close" data-dismiss="alert">×</a><span>ERROR deleting student/span></div>');
            }
            console.log(success);

        });
    }

}

function loadStudentData(id) {
    getAStudent(id, function (data) {

        if (data != null) {
            student_name.value = data[0].name;
            student_class.value = data[0].class;
            student_id.value = data[0].s_id;
            studentId.value = data[0]._id;
        } else {
            showalert("Couldn't get student data", 'danger');
        }
    });
    // student = JSON.stringify(student);
}

function getAStudent(id, callback) {
    var student;
    getReq(endpoint + '/' + id, function (status, data) {
        if (status != null) {
            student = data;
            callback(data);
        }
    });
}

function search(id) {
    getReq(endpoint + '/' + id, function (status, data) {
        if (status != null) {
            students_container.innerHTML = "";
            data.forEach(function (student) {
                students_container.innerHTML +=
                    '<div class="card">' +
                    '<img src="' + student.pic + '" alt="" class="pic">' +
                    '<h3 class="name">' + student.name + '</h3>' +
                    '<div class="id-class">' +
                    '<p class="id">' + student.s_id + '</p>' +
                    '<p class="class">' + student.class + '</p>' +
                    '</div>' +
                    '<div class="buttons">' +
                    '<a href="#student-modal" data-toggle="modal" class="edit-btn btn">EDIT</a>' +
                    '<a href="#" class="delete-btn btn" id="' + student._id + '">DELETE</a>' +
                    '</div> </div>'
            });
        } else {
            alert("Error getting data, code: " + status);
        }
    });
}


function showalert(message, alerttype) {

    $('#alert_placeholder').append('<div id="alertdiv" class="alert ' + 'alert-' + alerttype + '"><a class="close" data-dismiss="alert">×</a><span>' + message + '</span></div>');

//     setTimeout(function() {
//         // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
//         $("#alertdiv").remove();
//
//     }, 5000);
}


// Image upload
$(function () {
    // Configure Cloudinary

    $.cloudinary.config({
        cloud_name: 'tody',
        api_key: '452632437361316'
    });

    // Upload button
    var uploadButton = $('#save');

    // Upload button event
    uploadButton.on('click', function (e) {
        // Initiate upload
        cloudinary.openUploadWidget({
                cloud_name: 'tody',
                upload_preset: 'YOUR_UPLOAD_PRESET',
                tags: ['cgal']
            },
            function (error, result) {
                if (error) console.log(error);
                // If NO error, log image data to console
                var id = result[0].public_id;
                console.log(processImage(id));
            });
    });
})

function processImage(id) {
    var options = {
        client_hints: true,
    };
    return '<img src="' + $.cloudinary.url(id, options) + '" style="width: 100%; height: auto"/>';
}
/**
 * Created by susil panda on 10/13/2016.
 */
var app = angular.module('userApp', ['ngAnimate']);
var data1 = {
    name: 'default',
    skills: 'default',
    experience: 'default',
    currentproject: 'default',
    profile: 'default',
    role: 'default'
};
var data = [ {
    name: 'Rahul',
    skills: 'Java',
    experience: '3.5',
    currentproject: 'Avril',
    profile: 'Developer',
    role: 'SSE'
},
    {
        name: 'Manish',
        skills: 'C++',
        experience: '3.5',
        currentproject: 'Avril',
        profile: 'Developer',
        role: 'SSE'
    },
    {
        name: 'Sumit',
        skills: 'Java',
        experience: '5.0',
        currentproject: 'Avril',
        profile: 'Developer',
        role: 'SSE'
    },
    {
        name: 'Ajay',
        skills: 'Java',
        experience: '2.0',
        currentproject: 'Avril',
        profile: 'Tester',
        role: 'SSE'
    },
    {
        name: 'Piyush',
        skills: 'c++',
        experience: '2.5',
        currentproject: 'Avril',
        profile: 'Tester',
        role: 'SSE'
    },
    {
        name: 'Nisha',
        skills: 'Python',
        experience: '3.5',
        currentproject: 'Avril',
        profile: 'Developer',
        role: 'SSE'
    }
];

app.controller('userCtrl', function($scope, $http) {// , $rootElement) {
    $scope.init = function(value) {
        if (value == 1) {
            $http.get("http://localhost:3033/products").success(function (response) {
                //$scope.message = response;
                console.log("products retrieved");
                $scope.products = response;
                //getAllImage();
            });
        }
    }
});
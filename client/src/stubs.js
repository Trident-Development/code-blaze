const stubs = {};


stubs.c_cpp =
`#include <iostream>

using namespace std;

int main()
{
    cout << "Hello World!" << endl;
    return 0;
}`;



stubs.csharp = 
`using System;

namespace Temporary
{
    public class Temporary
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Hello world!");
        }
    }
}`;



stubs.golang = 
`package main

import "fmt"

func main() {
    fmt.Println("Hello world!")
}`;




stubs.java =
`public class Temporary {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}`;



stubs.javascript = (
`console.log("Hello world!");`
)



stubs.perl = (
`#!/usr/bin/perl

use strict;
use warnings;

print("Hello world!");`
);



stubs.php = 
`<?php
    echo "Hello world!\\n";
?>`;




stubs.python = `print("Hello world!")`;



stubs.ruby = 
`puts "Hello world!";`;



export default stubs;
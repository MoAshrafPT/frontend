import React from "react";
import {Link} from "react-router-dom"
import Toolbar from "./Toolbar";

export default function About()
{
    return(
        <div className="general-appearance">
          
            <Toolbar/>
            <div className="float-text">
            <h2>Who are we?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non sem eu massa accumsan tempus nec sed arcu. Aenean sed elementum nisl, sed ornare felis. Nullam gravida, odio eu pharetra luctus, dui ante venenatis massa, vitae finibus magna nibh sed urna. Aliquam at felis vitae metus maximus facilisis. Cras molestie augue at enim bibendum fermentum. Vestibulum pulvinar gravida felis quis egestas. Curabitur dolor felis, pulvinar id congue nec, tincidunt vel massa. Sed tempus felis justo, ac aliquet tortor tincidunt in.</p>
            </div>
            <div className="float-text">
            <h2>Our mission</h2>
            <p>Duis laoreet erat et consectetur molestie. Vestibulum vehicula tincidunt metus ultrices imperdiet. Donec eu dolor consectetur, consectetur orci hendrerit, ultrices ante. Donec pulvinar purus lorem. Pellentesque posuere tortor quam, suscipit ullamcorper risus faucibus blandit. Fusce rutrum iaculis bibendum. Nulla vehicula arcu ac sollicitudin ultrices. Pellentesque et sapien euismod, suscipit ex ac, aliquam est. Nunc a accumsan felis, sed cursus mauris. Mauris pulvinar commodo neque non sodales. Nam in eleifend augue, at porttitor lorem. Fusce nulla arcu, tempus laoreet ornare eget, accumsan sed nisl. Nam lobortis venenatis lorem a pulvinar.</p>
            </div>
            <div className="float-text">
            <h2>Where we compete</h2>
            <p>Suspendisse potenti. Fusce eu augue varius, tempor eros non, aliquet nulla. Fusce congue aliquam finibus. Etiam facilisis consequat commodo. Maecenas mollis et libero eu tincidunt. Integer convallis elementum lorem, vitae tincidunt orci mollis at. Duis risus odio, facilisis nec imperdiet vitae, interdum mattis urna. Morbi vulputate elit non tellus sodales pharetra. Curabitur scelerisque in enim vitae aliquam. Proin a dolor ac est ornare ornare eu vel lacus. Morbi non lacus cursus, euismod tellus in, hendrerit lorem. Aliquam ac orci ultricies, fermentum leo eget, elementum tellus. Duis tincidunt enim turpis, id mollis leo ornare in. Pellentesque rutrum at mauris nec malesuada. Nulla interdum dolor purus. Ut nunc urna, mollis id velit sed, interdum semper tellus.</p>
            </div>
          
           
        </div>
    )
}
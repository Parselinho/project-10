import React from 'react';
import { Helmet } from 'react-helmet';

const Header = () => (
    <Helmet>
        <html lang="en" />
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Treehouse Full Stack JavaScript Project 10 | Full Stack App with React and a REST API" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" type="image/x-icon" />
        <title>Courses</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap" rel="stylesheet" />
        <link href="../styles/reset.css" rel="stylesheet" />
        <link href="../styles/global.css" rel="stylesheet" />
    </Helmet>
);

export default Header;

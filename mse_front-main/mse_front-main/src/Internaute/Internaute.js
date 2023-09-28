import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import ImageTruck from './ImageTruck';
import DescTruck from './DescTruck';
import DescPoubelle from './DescPoubelle';
import PoubeleImage from './PoubeleImage';
import ImageRoute from './ImageRoute';
import DescRoute from './DescRoute';
import DescData from './DescData';
import ImageData from './ImageData';
import { Box, Typography } from '@mui/material';
import ImageDashboard from './ImageDashboard';
import DescDashboard from './DescDashboard';
import OurPartner from './OurPartner';


const sections = [
  { title: 'Accueil', url: '#' },
  { title: 'A Propos', url: '#' },
  { title: 'Mission', url: '#' },
  { title: 'Partenaires', url: '#' },
  { title: 'Contact', url: '#' },
 
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

export default function Internaute() {
  return (
    <ThemeProvider sx={{margin:0,padding:0}}  theme={theme}>
      <CssBaseline />
      <Container  maxWidth="lg" >
        <Header title="" sections={sections} />
        <main >
          <MainFeaturedPost  post={mainFeaturedPost} />
          <Typography
          marginTop={10}
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Notre Mission
        </Typography>
          <Grid marginTop={5} container spacing={4} >
          <PoubeleImage />
          <DescPoubelle/>
        
          </Grid>
        
         
          <Grid marginTop={10} container spacing={4} >
           
            <DescRoute/>
            <ImageRoute />
          </Grid>
          <Grid container marginTop={10} spacing={4} >

<ImageTruck />
<DescTruck/>
</Grid>
          <Grid container marginTop={10}  spacing={4} >
          <DescData/>
          <ImageData />
          </Grid>
          <Box display='flex' marginTop={10}  justifyContent='center' alignContent='center' alignItems='center' flexDirection='column' textAlign='center'>
          <ImageDashboard />
          <DescDashboard/>
          
          </Box>
              {/* <FeaturedPost  /> */}
            <OurPartner/>
          
          {/* <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid> */}
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
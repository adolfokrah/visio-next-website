import {  BlockList } from "visio-cms-lib/types";
import Navbar from "./navbar";
import Hero from "./hero";
import BlogContent from "./blog-content";
import Footer from './footer';

const blocks = [Navbar, Hero, BlogContent, Footer] as unknown as BlockList[];

export default blocks;
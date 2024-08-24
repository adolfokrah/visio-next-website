import {  BlockList } from "visio-cms-lib/types";
import Navbar from "./navbar";
import Hero from "./hero";
import BlogContent from "./blog-content";
import Footer from './footer';
import Metrics from './metrics'

const blocks = [Navbar, Hero, BlogContent, Footer, Metrics] as unknown as BlockList[];

export default blocks;
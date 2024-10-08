"use client";
import { Block, Color, MediaFile } from "visio-cms-lib/types";
import Repeater from "visio-cms-lib/Repeater";
import RepeaterItem from "visio-cms-lib/RepeaterItem";
import Text from "visio-cms-lib/Text";
import { cn, getProjectMode } from "visio-cms-lib";
import VisioImage from "visio-cms-lib/Image";

type NavbarProps = {
  logo: MediaFile;
  links: {
    title: string;
    url: string;
    itemKey: string;
    subLinks?: {
      title: string;
      url: string;
      itemKey: string;
      subsubLinks?: {
        title: string;
        url: string;
        itemKey: string;
        lastSubLInk?: { title: string; url: string; itemKey: string }[];
      }[];
    }[];
  }[];
  pageBlockId?: string;
  sideButtons: {
    title: string;
    url: string;
    color: Color;
  }[];
};

const Navbar: Block<NavbarProps> = ({
  links,
  pageBlockId = "",
  logo,
  sideButtons,
}) => {
  const projectMode = getProjectMode();

  return (
    <nav
      className={cn("visio-cms-p-2  visio-cms-w-full  visio-cms-bg-white ", {
        "visio-cms-fixed visio-cms-z-30": projectMode != "BUILDER",
      })}
    >
      <div className="visio-cms-flex justify-between items-center max-w-[1500px] mx-auto">
        <div className="visio-cms-flex visio-cms-gap-2 visio-cms-items-center">
          <VisioImage
            pageBlockId={pageBlockId}
            defaultValue={logo}
            propName="logo"
            className="visio-cms-w-14 visio-cms-h-14"
          />
          <Repeater
            pageBlockId={pageBlockId}
            propName="links"
            className="visio-cms-flex visio-cms-gap-4 visio-cms-relative visio-cms-items-center"
          >
            {links.map((link, index) => (
              <RepeaterItem
                key={`${link.itemKey}`}
                className="visio-cms-relative visio-cms-p-2 hover:visio-cms-bg-gray-100 visio-cms-cursor-pointer visio-cms-group"
                subRepeatersSchema={[
                  {
                    name: "subLinks",
                    schema: { title: "Sub Link", url: "/sub-link" },
                    itemCount: 10,
                  },
                ]}
              >
                <Text
                  pageBlockId={pageBlockId}
                  defaultValue={link.title}
                  propName={`links.${index}.title`}
                />

                <Repeater
                  pageBlockId={pageBlockId}
                  propName={`links.${index}.subLinks`}
                  className=" visio-cms-absolute visio-cms-left-0 visio-cms-top-[100%] visio-cms-hidden group-hover:visio-cms-block hover:visio-cms-block visio-cms-w-max visio-cms-min-w-[200px] visio-cms-bg-white visio-cms-shadow-md visio-cms-rounded-md visio-cms-z-10"
                >
                  {link.subLinks?.map((subLink, subIndex) => (
                    <RepeaterItem
                      key={`${subLink.itemKey}`}
                      className="visio-cms-relative visio-cms-p-2 hover:visio-cms-bg-gray-100 visio-cms-cursor-pointer visio-cms-group/item"
                      subRepeatersSchema={[
                        {
                          name: "subsubLinks",
                          schema: { title: "sub sub Link", url: "/sub-link" },
                          itemCount: 10,
                        },
                      ]}
                    >
                      <Text
                        pageBlockId={pageBlockId}
                        defaultValue={subLink.title}
                        propName={`links.${index}.subLinks.${subIndex}.title`}
                      />

                      <Repeater
                        pageBlockId={pageBlockId}
                        propName={`links.${index}.subLinks.${subIndex}.subsubLinks`}
                        className="visio-cms-absolute -visio-cms-right-[200px] visio-cms-top-0 visio-cms-bg-white visio-cms-shadow-md visio-cms-rounded-md visio-cms-z-10 visio-cms-w-[200px]"
                      >
                        {subLink.subsubLinks?.map((subsubLink, subSubIndex) => (
                          <RepeaterItem
                            key={`${subsubLink.itemKey}`}
                            className="visio-cms-relative visio-cms-p-2 hover:visio-cms-bg-gray-100 visio-cms-hidden visio-cms-cursor-pointer group-hover/item:visio-cms-block "
                          >
                            <Text
                              pageBlockId={pageBlockId}
                              defaultValue={subsubLink.title}
                              propName={`links.${index}.subLinks.${subIndex}.subsubLinks.${subSubIndex}.title`}
                            />
                          </RepeaterItem>
                        ))}
                      </Repeater>
                    </RepeaterItem>
                  ))}
                </Repeater>
              </RepeaterItem>
            ))}
          </Repeater>
        </div>

        <Repeater
          propName="sideButtons"
          pageBlockId={pageBlockId}
          className="visio-cms-flex visio-cms-gap-2"
        >
          {sideButtons &&
            sideButtons.map((button, index) => (
              <RepeaterItem
                key={button.title}
                className="visio-cms-px-3.5 visio-cms-py-1.5 hover:visio-cms-bg-indigo-500 visio-cms-cursor-pointer visio-cms-bg-indigo-400 visio-cms-rounded-md visio-cms-text-white"
                style={{ backgroundColor: button.color.colorHex }}
                sideEditingProps={[
                  {
                    propName: `sideButtons.${index}.title`,
                    label: "Title",
                    type: "text",
                  },
                  {
                    propName: `sideButtons.${index}.url`,
                    label: "URL",
                    type: "text",
                  },
                  {
                    propName: `sideButtons.${index}.color`,
                    label: "Color",
                    type: "color",
                  },
                ]}
              >
                {/* <Text pageBlockId={pageBlockId} defaultValue={button.title} propName={`sideButtons.${index}.title`} /> */}
                {button.title}
              </RepeaterItem>
            ))}
        </Repeater>
      </div>
    </nav>
  );
};

Navbar.Schema = {
  name: "Navbar",
  id: "navbar",
  sideEditingProps: [],
  defaultPropValues: {
    sideButtons: [],
    logo: {
      mediaHash: "https://placehold.co/70x70",
      altText: "Hero Image",
      width: 70,
      height: 70,
    },
    links: [
      { title: "Home", url: "/", itemKey: "home" },
      { title: "About", url: "/about", itemKey: "about" },
      { title: "Contact", url: "/contact", itemKey: "contact" },
    ],
  },
  group: "Navigation",
  repeaters: [
    {
      name: "links",
      schema: {
        title: "Link",
        url: "/",
      },
      itemCount: 10,
    },
    {
      name: "sideButtons",
      schema: {
        title: "Login",
        url: "/",
        color: { colorHex: "#000000" },
      },
      itemCount: 2,
    },
  ],
};

export default Navbar;

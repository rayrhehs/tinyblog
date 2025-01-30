import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./components/ui/button";
import { useContext, useEffect, useState } from "react";
import { BlogTableContext, BlogAddModalContext } from "./App";
import { motion } from "motion/react";
import { useForm, Controller, FieldErrors, FieldValues } from "react-hook-form";

const MAX_CHARS = 250;

type AdminModeType = {
  adminMode: boolean;
};

export const BlogAdd = motion(function BlogAdd({ adminMode }: AdminModeType) {
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    // mode specifies form monitoring type (default is on submit function)
    mode: "onChange",
  });

  const {
    control,
    formState: { errors },
    trigger,
    watch,
  } = form;

  // add this in during home button
  const blogTableContext = useContext(BlogTableContext);
  const blogAddModalContext = useContext(BlogAddModalContext);
  // check to see if null -> by doing this, typescript will not complain!
  if (!blogTableContext) {
    throw new Error(
      "BlogTableContext must be used within a BlogTableContext.Provider"
    );
  }

  // check to see if null -> by doing this, typescript will not complain!
  if (!blogAddModalContext) {
    throw new Error(
      "BlogAddModalContext must be used within a BlogAddModalContext.Provider"
    );
  }

  const { setTableState } = blogTableContext;
  const { setAddOpen } = blogAddModalContext;
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
  });
  const [formFilled, setFormFilled] = useState(false);

  const watchTitle = watch("title");
  const watchContent = watch("content");

  const handleErrors = (errors: any) => {
    const hasErrors = errors.title || errors.content;

    if (errors.title) {
      console.log(errors.title);
    } else if (errors.content) {
      console.log(errors.content);
    }

    console.log(formFilled);
    setFormFilled(!hasErrors);
  };

  useEffect(() => {
    // trigger validation on mount for both fields
    trigger("content");
    trigger("title");
    // this is the shorthand version
    // trigger(["title", "content"]);
  }, []);

  useEffect(() => {
    handleErrors(errors);
  }, [errors.title, errors.content]);

  // this will only work if i have a watcher or trigger to gather form errors from title controller - refer to emoot createMessageStep
  useEffect(() => {
    if (watchTitle) {
      trigger("content");
    }
  }, [watchTitle, watchContent, trigger]);

  const updateBlogTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlogData({
      ...blogData,
      title: e.target.value,
    });
  };

  const updateBlogContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARS) {
      setBlogData({
        ...blogData,
        content: newText,
      });
    }
  };

  const remainingChars = MAX_CHARS - blogData.content.length;

  const handlePublish = () => {
    const submitBlogData = { title: blogData.title, content: blogData.content };
    setAddOpen(false);

    fetch("http://localhost:3000/api/blog/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitBlogData),
    })
      .then((response) => {
        if (response.status === 201) {
          setTableState(true);
          // updates entire object rather than multiple useStates
          setBlogData({ title: "", content: "" });
          console.log("New entry ereated!");
        }
      })
      .catch((err) => {
        console.log(`This is the ERROR: ${err}`);
      });
  };

  return (
    <motion.div
      initial={{ x: "100%", opacity: 1, filter: "blur(0px)" }}
      animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{ x: "100%", opacity: 0, filter: "blur(1px)" }} // Blur while fading out
      transition={{
        x: { duration: 0.35 },
        opacity: { duration: 0.7 },
        filter: { duration: 0.5 },
      }}
      className={"absolute"}
    >
      <Card className="px-4" variant={adminMode ? "inverse" : "default"}>
        <div>
          <h1
            className={
              adminMode
                ? "text-left px-2 text-3xl font-bold text-white mb-4"
                : "text-left px-2 text-3xl font-bold text-totalblue mb-4"
            }
          >
            New Blog
          </h1>
        </div>
        <div className="px-2 text-totalblue flex flex-col gap-3">
          <div className="text-left flex flex-col gap-2">
            <Label
              htmlFor="message"
              className={adminMode ? "text-white" : "text-totalblue"}
            >
              Title
            </Label>
            <Controller
              name="title"
              control={control}
              rules={{
                required: { value: true, message: "Title must not be empty." },
              }}
              render={({ field: { onChange } }) => (
                <Textarea
                  placeholder="Write your title here."
                  className="flex min-h-[45px] h-[45px] resize-none px-4"
                  id="message"
                  value={blogData.title}
                  onChange={(text) => {
                    onChange(text);
                    updateBlogTitle(text);
                  }}
                  maxLength={30}
                  variant={adminMode ? "inverse" : "default"}
                />
              )}
            />
          </div>
          <div className="text-left flex flex-col gap-2">
            <Label
              htmlFor="message"
              className={adminMode ? "text-white" : "text-totalblue"}
            >
              Content
            </Label>
            <Controller
              name="content"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Content must not be empty.",
                },
              }}
              render={({ field: { onChange } }) => (
                <Textarea
                  placeholder="Write your blog here."
                  className="flex h-64 resize-none p-4"
                  id="message"
                  value={blogData.content}
                  onChange={(text) => {
                    onChange(text);
                    updateBlogContent(text);
                  }}
                  maxLength={MAX_CHARS}
                  variant={adminMode ? "inverse" : "default"}
                />
              )}
            />
          </div>
        </div>
        <div className="px-2 py-4 flex justify-end gap-x-3">
          <Label
            className={
              adminMode
                ? "text-white text-md font-semibold self-center"
                : "text-totalblue text-md font-semibold self-center"
            }
          >
            {remainingChars}
          </Label>
          {formFilled ? (
            <Button
              variant={adminMode ? "outlineInverse" : "outline"}
              onClick={handlePublish}
            >
              <b>Publish</b>
            </Button>
          ) : (
            <Button
              variant={adminMode ? "outlineInverseDisabled" : "outlineDisabled"}
            >
              <b>Publish</b>
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
});

export default BlogAdd;

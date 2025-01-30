import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./components/ui/button";
import { useContext, useState, useEffect } from "react";
import { BlogTableContext, EditModeContext, BlogIDContext } from "./App";
import { motion } from "motion/react";
import { useForm, Controller } from "react-hook-form";

const MAX_CHARS = 250;

type AdminModeType = {
  adminMode: boolean;
};

export const BlogEdit = motion(function BlogEdit({ adminMode }: AdminModeType) {
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
    reset,
  } = form;

  // add this in during home button
  const blogTableContext = useContext(BlogTableContext);
  const editModeContext = useContext(EditModeContext);
  const blogIDContext = useContext(BlogIDContext);

  // check to see if null -> by doing this, typescript will not complain!
  if (!blogTableContext) {
    throw new Error(
      "BlogTableContext must be used within a BlogTableContext.Provider"
    );
  }

  if (!editModeContext) {
    throw new Error(
      "EditModeContext must be used within an EditModeContext.Provider"
    );
  }

  if (!blogIDContext) {
    throw new Error(
      "BlogIDContext must be used within a BlogIDContext.Provider"
    );
  }

  const { blogID } = blogIDContext;
  const { setTableState } = blogTableContext;
  const { setEditMode } = editModeContext;

  const [blogData, setBlogData] = useState({
    title: "",
    date: "",
    content: "",
  });

  const [formFilled, setFormFilled] = useState(false);
  const [currentError, setCurrentError] = useState("");

  const watchTitle = watch("title");
  const watchContent = watch("content");

  const handleErrors = (errors: any) => {
    const hasErrors = errors.title || errors.content;

    if (errors.title) {
      setCurrentError(errors.title.message);
      console.log(errors.title);
    } else if (errors.content) {
      setCurrentError(errors.content.message);
      console.log(errors.content);
    }

    console.log(formFilled);
    setFormFilled(!hasErrors);
  };

  // when blogData is updated (on load), reset blogData to include fetched data = updates error handling as well
  useEffect(() => {
    if (blogData) {
      reset({
        title: blogData.title,
        content: blogData.content,
      });
    }
  }, [blogData]);

  useEffect(() => {
    handleErrors(errors);
  }, [errors.title, errors.content]);

  // this will only work if i have a watcher or trigger to gather form errors from title controller - refer to emoot createMessageStep
  useEffect(() => {
    if (watchTitle) {
      trigger("content");
      setCurrentError("");
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

  const handleSubmitEdit = () => {
    setEditMode(false);
    const submitUpdatedBlogData = {
      title: blogData.title,
      date: blogData.date,
      content: blogData.content,
    };

    fetch(`http://localhost:3000/api/blog/${blogID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitUpdatedBlogData),
    })
      .then((response) => {
        if (response.status === 200) {
          setTableState(true);
          // updates entire object rather than multiple useStates
          setBlogData({ title: "", date: "", content: "" });
          console.log("Entry has been updated!");
        }
      })
      .catch((err) => {
        console.log(`This is the ERROR: ${err}`);
      });
  };

  const handleView = () => {
    fetch(`http://localhost:3000/api/blog/${blogID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json(); // lets us access only the response jsons we want
      })
      .then((data) => {
        setBlogData(data);
      })
      .catch((err) => {
        console.log(`This is the ERROR: ${err}`);
      });
  };

  useEffect(() => {
    handleView();
  }, []);

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
            Edit Blog
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
            {formFilled ? remainingChars : currentError}
          </Label>
          {formFilled ? (
            <Button
              variant={adminMode ? "outlineInverse" : "outline"}
              onClick={handleSubmitEdit}
            >
              <b>Done</b>
            </Button>
          ) : (
            <Button
              variant={adminMode ? "outlineInverseDisabled" : "outlineDisabled"}
            >
              <b>Done</b>
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
});

export default BlogEdit;

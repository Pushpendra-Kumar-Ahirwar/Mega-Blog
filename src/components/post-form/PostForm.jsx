
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Loader, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true)
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = appwriteService.createPost({ ...data, userId: userData.$id });
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            toast.error("Error in submitting",{
                position:"top-left",
                autoClose:2000
            })
            console.error("Error submittion post: ", error)
        } finally {
            setLoading(false)
        }
    };


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-left",
            theme: "dark",
            autoClose: 2000,
           
        });
    };

    const onSubmit = (data) => {
        if (!data.title) {
            notifyError("Title is required!");
            return;
        }
        if (!data.content) {
            notifyError("Content is required!");
            return;
        }
        if (!data.slug) {
            notifyError("Slug is required!")
            return
        }
        if (!post && (!data.image || data.image.length === 0)) {
            notifyError("Image is required!");
            return;
        }
        submit(data);
            toast.success("Post Sucsesfully",{
                position:"top-left",
                autoClose:2000
            })
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", {required:false})}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: false })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Poster-Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: false })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                {loading ? <Button bgColor={post ? "bg-green-500" : undefined} className=" w-full mt-3 p">
                    <Loader />
                </Button> :
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full mt-3">
                        {post ? "Update" : "Submit"}
                    </Button>
                }
            </div>
        </form>
    );
}
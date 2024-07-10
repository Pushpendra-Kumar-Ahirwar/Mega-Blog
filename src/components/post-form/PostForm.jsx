import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Select, Button, Input, RTE } from "../index";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, control, watch, setValue, getValue } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                content: post?.slug || "",
                status: post?.status || "active",
            },
        });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const sumbit = async (data) => {
        if (post) {
            const file = data.image[0]
                ? appwriteService.uploadFile(data.image[0])
                : null;
            if (file) {
                appwriteService.deleteFile(featuredImage);
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
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                });
                if (dbPost) {
                    navigate(`post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title, { shouldValidate: true }));
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, setValue, slugTransform]);

    return (
        <form onSubmit={handleSubmit(sumbit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />

                <RTE
                    label='Content:'
                    name='content'
                    control={control}
                    defaultValue={getValue("content")}
                />
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="FeaturedImage: "
                    type='file'
                    className='mb-4'
                    accept="image/png, image/jgp, image/jpeg, image/gif"
                    {...register('image', {
                        required: !post
                    })}
                />

                {post && (
                    <div className="w-full mb-4 ">
                        <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} />
                    </div>
                )}

                <Select
                    option={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register('status', {
                        required: true
                    })} />

                <Button type="sumbit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>

            </div>
        </form>
    );
}
export default PostForm;

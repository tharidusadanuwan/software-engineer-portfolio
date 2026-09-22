"use client";

import { useEffect, useState } from "react";

import {
  X,
  Upload,
  Trash2,
  RefreshCw,
  Loader2,
  ImagePlus,
} from "lucide-react";

import { api, API_URL } from "@/lib/api";
import {
  Project,
  ProjectImage,
} from "@/types/project";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectImageManager({
  project,
  onClose,
}: Props) {
  const [images, setImages] = useState<
    ProjectImage[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [replacingId, setReplacingId] =
    useState<number | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const loadImages = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/projects/${project.id}/images`,
      );

      setImages(response.data.images);
    } catch (error) {
      console.error(
        "Failed to load images:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, [project.id]);

  const uploadImage = async (
    file: File,
  ) => {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("image", file);

      await api.post(
        `/projects/${project.id}/images`,
        formData,
      );

      await loadImages();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to upload image",
      );
    } finally {
      setUploading(false);
    }
  };

  const replaceImage = async (
    imageId: number,
    file: File,
  ) => {
    try {
      setReplacingId(imageId);

      const formData = new FormData();

      formData.append("image", file);

      await api.put(
        `/projects/${project.id}/images/${imageId}`,
        formData,
      );

      await loadImages();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to replace image",
      );
    } finally {
      setReplacingId(null);
    }
  };

  const deleteImage = async (
    imageId: number,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(imageId);

      await api.delete(
        `/projects/${project.id}/images/${imageId}`,
      );

      await loadImages();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to delete image",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const getImageUrl = (
    image: string,
  ) => {
    const backendUrl =
      API_URL.replace("/api", "");

    return `${backendUrl}${image}`;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#111827] shadow-2xl">
        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Project Images
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {project.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Upload */}

        <div className="border-b border-slate-800 p-6">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-[#0b1220] px-6 py-8 transition hover:border-blue-500 hover:bg-blue-500/5">
            {uploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
            ) : (
              <ImagePlus className="h-8 w-8 text-blue-400" />
            )}

            <p className="mt-3 text-sm font-medium text-white">
              {uploading
                ? "Uploading..."
                : "Upload Project Image"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              JPG, PNG, WEBP or GIF · Max 5MB
            </p>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                if (file) {
                  uploadImage(file);
                }

                e.target.value = "";
              }}
            />
          </label>
        </div>

        {/* Images */}

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-7 w-7 animate-spin text-blue-400" />
            </div>
          ) : images.length === 0 ? (
            <div className="py-16 text-center">
              <ImagePlus className="mx-auto h-10 w-10 text-slate-600" />

              <p className="mt-3 text-sm text-slate-500">
                No images uploaded yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1220]"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={getImageUrl(
                        image.image,
                      )}
                      alt={project.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3">
                    {/* Replace */}

                    <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white">
                      {replacingId ===
                      image.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}

                      Replace

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="hidden"
                        disabled={
                          replacingId !== null
                        }
                        onChange={(e) => {
                          const file =
                            e.target.files?.[0];

                          if (file) {
                            replaceImage(
                              image.id,
                              file,
                            );
                          }

                          e.target.value = "";
                        }}
                      />
                    </label>

                    {/* Delete */}

                    <button
                      onClick={() =>
                        deleteImage(image.id)
                      }
                      disabled={
                        deletingId !== null
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                      {deletingId ===
                      image.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Upload, ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export default function UploadPhotoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive",
      })
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleUpload = () => {
    if (selectedImage) {
      // Save photo to localStorage
      localStorage.setItem("profilePhoto", selectedImage)

      toast({
        title: "Success",
        description: "Profile photo updated successfully",
      })

      // Navigate back to profile page
      router.push("/")
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Button onClick={() => router.push("/")} variant="ghost" className="text-[#6e6e73] hover:text-[#1d1d1f]">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-[#1d1d1f]">Upload Profile Photo</h1>
            <p className="text-sm text-[#6e6e73]">Choose a photo from your device</p>
          </div>
        </div>

        <div className="h-px bg-[#d2d2d7]" />

        {/* Upload Area */}
        <div className="mt-8 space-y-6">
          {/* Current Photo Preview */}
          <div className="flex items-center gap-4 rounded-lg bg-white p-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={selectedImage || "/images/image.png"} />
              <AvatarFallback className="bg-[#2d1b4e] text-white">MR</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-[#1d1d1f]">Current Photo</p>
              <p className="text-sm text-[#6e6e73]">{selectedImage ? "New photo selected" : "Mahrez Riyad"}</p>
            </div>
            {selectedImage && (
              <Button
                onClick={handleRemoveImage}
                variant="ghost"
                size="icon"
                className="ml-auto text-[#6e6e73] hover:text-[#1d1d1f]"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Drag and Drop Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-lg border-2 border-dashed bg-white p-12 text-center transition-colors ${
              isDragging ? "border-[#0f1729] bg-[#f5f5f7]" : "border-[#d2d2d7] hover:border-[#6e6e73]"
            }`}
          >
            <Upload className="mx-auto mb-4 h-12 w-12 text-[#86868b]" />
            <h3 className="mb-2 text-lg font-medium text-[#1d1d1f]">
              {isDragging ? "Drop your photo here" : "Choose a photo or drag it here"}
            </h3>
            <p className="text-sm text-[#6e6e73]">Supports: JPG, PNG, GIF (Max size: 5MB)</p>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={() => router.push("/")}
              variant="secondary"
              className="bg-[#e8e8ed] text-[#6e6e73] hover:bg-[#d2d2d7]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedImage}
              className="bg-[#0f1729] text-white hover:bg-[#1a2438] disabled:opacity-50"
            >
              Save Photo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [profilePhoto, setProfilePhoto] = useState("/images/image.png")

  const [formData, setFormData] = useState({
    firstName: "Mahrez",
    lastName: "Riyad",
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const savedPhoto = localStorage.getItem("profilePhoto")
    if (savedPhoto) {
      setProfilePhoto(savedPhoto)
    }
  }, [])

  const handleUploadPhoto = () => {
    router.push("/profile/upload-photo")
  }

  const handleUpdateProfile = () => {
    if (!formData.firstName || !formData.lastName || !formData.username) {
      toast({
        title: "Error",
        description: "Please fill in all profile fields",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would send to server
    toast({
      title: "Success",
      description: "Profile information updated successfully",
    })
  }

  const handleChangePassword = () => {
    // Validate current password is provided
    if (!formData.currentPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive",
      })
      return
    }

    // In a real app, verify current password with server
    // For demo purposes, let's assume "password123" is the correct current password
    if (formData.currentPassword !== "password123") {
      toast({
        title: "Error",
        description: "Current password is incorrect",
        variant: "destructive",
      })
      return
    }

    // Validate new password is provided
    if (!formData.newPassword) {
      toast({
        title: "Error",
        description: "Please enter a new password",
        variant: "destructive",
      })
      return
    }

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    // If validation passes, update password
    toast({
      title: "Success",
      description: "Password changed successfully",
    })

    // Clear password fields after successful change
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profilePhoto || "/placeholder.svg"} />
              <AvatarFallback className="bg-[#2d1b4e] text-white">MR</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-[#1d1d1f]">
                {formData.firstName || "First Name"} {formData.lastName || "Last Name"}
              </h1>
              <p className="text-sm text-[#6e6e73]">Work at Doxa</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleUploadPhoto} className="bg-[#0f1729] text-white hover:bg-[#1a2438]">
              Upload a new photo
            </Button>
            <Button variant="secondary" className="bg-[#e8e8ed] text-[#6e6e73] hover:bg-[#d2d2d7]">
              Delete
            </Button>
          </div>
        </div>

        <div className="h-px bg-[#d2d2d7]" />

        {/* Form Section */}
        <div className="mt-8 space-y-8">
          {/* Profile Information Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-[#1d1d1f]">Profile Information</h2>

            {/* Name Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-[#1d1d1f]">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="eg. Mahrez"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="border-[#d2d2d7] bg-white text-[#6e6e73] placeholder:text-[#86868b]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-[#1d1d1f]">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="eg. Riyad"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="border-[#d2d2d7] bg-white text-[#6e6e73] placeholder:text-[#86868b]"
                />
              </div>
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-[#1d1d1f]">
                User Name
              </Label>
              <Input
                id="username"
                placeholder="eg. RiyadMahrez26"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="border-[#d2d2d7] bg-white text-[#6e6e73] placeholder:text-[#86868b]"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button onClick={handleUpdateProfile} className="bg-[#0f1729] text-white hover:bg-[#1a2438]">
                Save Profile Changes
              </Button>
            </div>
          </div>

          <div className="h-px bg-[#d2d2d7]" />

          {/* Password Change Section */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-lg font-semibold text-[#1d1d1f]">Change Password</h2>
              <p className="text-sm text-[#6e6e73]">
                Enter your current password and confirm your new password to make changes
              </p>
            </div>

            {/* Password Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-medium text-[#1d1d1f]">
                  Current password
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#86868b]" />
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="border-[#d2d2d7] bg-white pl-10 pr-10 text-[#6e6e73]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#6e6e73]"
                  >
                    {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium text-[#1d1d1f]">
                  New password
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#86868b]" />
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="border-[#d2d2d7] bg-white pl-10 pr-10 text-[#6e6e73]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#6e6e73]"
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#1d1d1f]">
                Confirm new password
              </Label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#86868b]" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="border-[#d2d2d7] bg-white pl-10 pr-10 text-[#6e6e73]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#6e6e73]"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button onClick={handleChangePassword} className="bg-[#0f1729] text-white hover:bg-[#1a2438]">
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

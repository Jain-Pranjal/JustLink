'use client'

import { X } from 'lucide-react'
import { type FC, useState } from 'react'

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
// import { contactUsAction } from '@/server/actions/contact'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const ContactUsPopup: FC<Props> = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
        reason: '',
        product: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // TODO: need to make a tRPC procedure for sendng the contact detaills

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     setLoading(true)
    //     await contactUsAction({
    //         email: formData.email,
    //         message: formData.message,
    //         name: `${formData.first_name} ${formData.last_name}`,
    //         phone: formData.phone,
    //         reason: formData.reason,
    //         product: formData.product
    //     })
    //     setLoading(false)
    //     setOpen(false)
    //     alert('Form submitted successfully!')
    //     setFormData({
    //         first_name: '',
    //         last_name: '',
    //         email: '',
    //         phone: '',
    //         message: '',
    //         reason: '',
    //         product: ''
    //     })
    // }

    const handleSubmit = () => {
        // TODO: need to make a tRPC procedure for sendng the contact detaills
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="max-w-[30rem] rounded-2xl border border-[#2A2A2A]/20 bg-gradient-to-t from-[#111111] via-[#1C1C1C] to-[#1C1C1C] max-lg:top-auto max-lg:bottom-0 max-lg:translate-y-[0%] max-lg:rounded-t-2xl">
                <AlertDialogTitle></AlertDialogTitle>
                <AlertDialogCancel className="absolute top-1 right-1 w-fit cursor-pointer border-none bg-transparent hover:bg-[#090a0a]">
                    <X className="text-white" />
                </AlertDialogCancel>

                <div>
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-white">
                            Contact Us
                        </h1>
                        <p className="my-2 font-medium text-white">
                            Need assistance, we are here to help
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 flex flex-col gap-3"
                    >
                        <Input
                            className="border-[#343434] bg-[#262626] py-6 text-base font-medium text-[#e5e3df] placeholder:text-[#888888]"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            name="first_name"
                            placeholder="First Name *"
                        />
                        <Input
                            className="border-[#343434] bg-[#262626] py-6 text-base font-medium text-[#e5e3df] placeholder:text-[#888888]"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                            name="last_name"
                            placeholder="Last Name *"
                        />
                        <Input
                            className="border-[#343434] bg-[#262626] py-6 text-base font-medium text-[#e5e3df] placeholder:text-[#888888]"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            required
                            placeholder="Email *"
                            name="email"
                        />
                        <Input
                            className="border-[#343434] bg-[#262626] py-6 text-base font-medium text-[#e5e3df] placeholder:text-[#888888]"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                        />

                        <Textarea
                            required
                            placeholder="Message*"
                            className="h-32 w-full resize-none border-[#343434] bg-[#262626] py-6 text-base font-medium text-[#e5e3df] placeholder:text-[#888888]"
                            name="message"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    message: e.target.value,
                                })
                            }
                            value={formData.message}
                        />

                        <Button
                            disabled={loading}
                            type="submit"
                            size={'lg'}
                            variant={'default'}
                            className="mt-5 cursor-pointer rounded-full hover:bg-[#090a0a]"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ContactUsPopup

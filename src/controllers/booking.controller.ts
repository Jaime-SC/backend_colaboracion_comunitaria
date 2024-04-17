import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { Booking } from '../entities/booking.entity';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get()
  async findAll(): Promise<Booking[]> {
    return this.bookingService.findAllBookings();
  }

  @Post()
  async create(@Body() booking: Booking): Promise<Booking> {
    return this.bookingService.createBooking(booking);
  }
}

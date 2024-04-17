import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(booking: Booking): Promise<Booking> {
    return await this.bookingRepository.save(booking);
  }

  async findAllBookings(): Promise<Booking[]> {
    return await this.bookingRepository.find();
  }

  async findBookingById(id: number): Promise<Booking | undefined> {
    const options: FindOneOptions<Booking> = {
      where: { id },
    };
    return await this.bookingRepository.findOne(options);
  }

  async updateBooking(
    id: number,
    booking: Booking,
  ): Promise<Booking | undefined> {
    await this.bookingRepository.update(id, booking);
    return this.findBookingById(id);
  }

  async deleteBooking(id: number): Promise<void> {
    await this.bookingRepository.delete(id);
  }
}

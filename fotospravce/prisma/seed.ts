import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.invoice.deleteMany();
  await prisma.job.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'jan@foto.cz',
      password: await hash('demo1234', 10),
      name: 'Jan Novák',
      businessName: 'Jan Novák Photography',
      ico: '12345678',
      address: 'Vinohradská 42, Praha 2',
      phone: '+420 777 123 456',
      vatPayer: false,
    },
  });

  // 6 klientů
  const c = await Promise.all([
    prisma.client.create({ data: { userId: user.id, name: 'Petra Dvořáková', email: 'petra@email.cz', phone: '+420 602 111 222', source: 'instagram', notes: 'Nevěsta, miluje outdoor focení' } }),
    prisma.client.create({ data: { userId: user.id, name: 'Tomáš Horák', email: 'tomas.h@gmail.com', phone: '+420 603 333 444', source: 'doporuceni', companyName: 'Horák Design s.r.o.', ico: '87654321' } }),
    prisma.client.create({ data: { userId: user.id, name: 'Lucie Svobodová', email: 'lucie.s@seznam.cz', phone: '+420 776 555 666', source: 'web' } }),
    prisma.client.create({ data: { userId: user.id, name: 'Martin Černý', email: 'martin@firma.cz', phone: '+420 608 777 888', source: 'facebook', companyName: 'TechStart s.r.o.', ico: '11223344' } }),
    prisma.client.create({ data: { userId: user.id, name: 'Kateřina Nováková', email: 'katka.n@email.cz', phone: '+420 721 999 000', source: 'doporuceni' } }),
    prisma.client.create({ data: { userId: user.id, name: 'Ondřej Král', email: 'ondrej.kral@email.cz', phone: '+420 730 444 555', source: 'instagram' } }),
  ]);

  const now = new Date();
  const d = (days: number) => new Date(now.getTime() + days * 86400000);

  // 10 zakázek v různých stavech
  const jobs = await Promise.all([
    prisma.job.create({ data: { userId: user.id, clientId: c[0].id, title: 'Svatba Petra & Jan', type: 'svatba', status: 'odevzdano', shootDate: d(-30), location: 'Zámek Karlštejn', price: 35000, deposit: 15000, description: 'Celodenní svatba, obřad venku' } }),
    prisma.job.create({ data: { userId: user.id, clientId: c[1].id, title: 'Firemní portréty Horák Design', type: 'firemni', status: 'editace', shootDate: d(-5), location: 'Kancelář klienta, Praha 5', price: 12000, deposit: 6000 } }),
    prisma.job.create({ data: { userId: user.id, clientId: c[2].id, title: 'Rodinné focení Svobodovi', type: 'portret', status: 'potvrzeno', shootDate: d(4), location: 'Stromovka, Praha 7', price: 5500, deposit: 2000 } }),
    prisma.job.create({ data: { userId: user.id, clientId: c[3].id, title: 'Produktové fotky e-shop', type: 'produkt', status: 'foceni', shootDate: d(1), location: 'Vlastní studio', price: 18000, deposit: 9000, description: '50 produktů, bílé pozadí + lifestyle' } }),
    prisma.job.create({ data: { userId: user.id, clientId: c[4].id, title: 'Svatba Kateřina & David', type: 'svatba', status: 'nabidka', shootDate: d(40), location: 'Botanická zahrada, Brno', price: 42000 } }),
    prisma.job.create({ data: { userId: user.id, clientId: c[0].id, title: 'Těhotenské focení Petra', type: 'portret', status: 'poptavka', price: 4500 } }),
    prisma.job.create({ data: { userId: user.id, clientId: c[5].id, title: 'Portrét pro LinkedIn', type: 'portret', status: 'odevzdano', shootDate: d(-45), location: 'Studio', price: 3500, deposit: 3500 } }),
    prisma.job.create({ data: { userId: user.id, clientId: c[1].id, title: 'Vánoční párty Horák Design', type: 'firemni', status: 'potvrzeno', shootDate: d(18), location: 'Hotel Ambassador', price: 15000, deposit: 7500 } }),
    prisma.job.create({ data: { userId: user.id, clientId: c[5].id, title: 'Novorozenecké focení', type: 'portret', status: 'poptavka', price: 5000 } }),
    prisma.job.create({ data: { userId: user.id, clientId: c[3].id, title: 'Firemní akce TechStart', type: 'firemni', status: 'nabidka', shootDate: d(25), location: 'Karlín, Praha 8', price: 16000 } }),
  ]);

  // 4 faktury
  await prisma.invoice.create({
    data: {
      userId: user.id, clientId: c[0].id, jobId: jobs[0].id,
      invoiceNumber: 'F2026-001', dueDate: d(-10), status: 'paid',
      items: JSON.stringify([{ description: 'Svatební fotografie — celodenní balíček', quantity: 1, unitPrice: 35000 }]),
      subtotal: 35000, total: 35000, variableSymbol: '2026001',
    },
  });
  await prisma.invoice.create({
    data: {
      userId: user.id, clientId: c[1].id, jobId: jobs[1].id,
      invoiceNumber: 'F2026-002', issueDate: d(-3), dueDate: d(11), status: 'sent',
      items: JSON.stringify([{ description: 'Firemní portréty — 10 osob', quantity: 10, unitPrice: 1200 }]),
      subtotal: 12000, total: 12000, variableSymbol: '2026002',
    },
  });
  await prisma.invoice.create({
    data: {
      userId: user.id, clientId: c[5].id, jobId: jobs[6].id,
      invoiceNumber: 'F2026-003', issueDate: d(-40), dueDate: d(-26), status: 'overdue',
      items: JSON.stringify([{ description: 'Portrétní focení LinkedIn', quantity: 1, unitPrice: 3500 }]),
      subtotal: 3500, total: 3500, variableSymbol: '2026003',
    },
  });
  await prisma.invoice.create({
    data: {
      userId: user.id, clientId: c[3].id, jobId: jobs[3].id,
      invoiceNumber: 'F2026-004', dueDate: d(14), status: 'draft',
      items: JSON.stringify([{ description: 'Produktové fotografie e-shop — 50ks', quantity: 50, unitPrice: 360 }]),
      subtotal: 18000, total: 18000, variableSymbol: '2026004',
    },
  });

  console.log('Seed OK!');
  console.log('Login: jan@foto.cz / demo1234');
  console.log(`User: ${user.id}`);
  console.log(`Clients: ${c.length}, Jobs: ${jobs.length}, Invoices: 4`);
}

main().catch(console.error).finally(() => prisma.$disconnect());

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';


test('hata olmadan render ediliyor', () => {
    render(<IletisimFormu />);
});

test('iletişim formu headerı render ediliyor', () => {
    render(<IletisimFormu />);
    const header = screen.getByText(/İletişim Formu/i);
    expect(header).toBeInTheDocument();

});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    render(<IletisimFormu />);

    const name = screen.getByLabelText("Ad*");
    userEvent.type(name, "abc");

    const err = await screen.findAllByTestId("error");
    expect(err).toHaveLength(1);
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu />);
    const buton = screen.getByRole("button");
    userEvent.click(buton);

    await waitFor(() => {
        const err = screen.queryAllByTestId("error");
        expect(err).toHaveLength(3);
    })
});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {

    render(<IletisimFormu />);
    const name = screen.getByLabelText("Ad*");
    userEvent.type(name, "Ilhan");
    const surname = screen.getByLabelText("Soyad*");
    userEvent.type(surname, "Mansiz");
    const buton = screen.getByRole("button", "submit");
    userEvent.click(buton);

    expect(screen.queryAllByTestId("error")).toHaveLength(1);




});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    render(<IletisimFormu />);
    const mail = screen.getByLabelText("Email*");
    userEvent.type(mail, "abc");

    const err = screen.getByTestId("error");
    expect(err).toBeInTheDocument();


});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    render(<IletisimFormu />);
    const buton = screen.getByRole('button');
    userEvent.click(buton);

    const errorMessage = await screen.findByText(/soyad gereklidir./i);
    expect(errorMessage).toBeInTheDocument();

});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    render(<IletisimFormu />);
    const name = screen.getByLabelText("Ad*");
    userEvent.type(name, "Ilhan");
    const surname = screen.getByLabelText("Soyad*");
    userEvent.type(surname, "Mansiz");
    const mail = screen.getByLabelText("Email*");
    userEvent.type(mail, "yuzyilingolcusu@hotmail.com");
    const buton = screen.getByRole("button", "submit");
    userEvent.click(buton);
    expect(screen.queryAllByTestId("error")).toHaveLength(0);
});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    render(<IletisimFormu />);
    const name = screen.getByPlaceholderText(/İlhan/i);
    userEvent.type(name, "abc");
    const surname = screen.getByPlaceholderText(/Mansız/i);
    userEvent.type(surname, "abc");
    const mail = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
    userEvent.type(mail, "abc@abc.com");
    const buton = screen.getByRole("button");
    userEvent.click(buton);


});

